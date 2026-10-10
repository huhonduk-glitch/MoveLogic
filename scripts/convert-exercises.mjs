// 운동DB_설계표.xlsx → data/exercises.json 변환 스크립트
// 실행: npm run convert
//
// 규칙 (CLAUDE.md)
// - '확인 상태'가 "확인완료"이고 '근거 출처'가 있는 운동만 JSON에 넣는다.
//   (미검수 자료는 공개 저장소·앱에 올리지 않는다)
// - 칸 안에 "확인필요"가 적힌 내용은 공개하지 않고 빈칸으로 바꾼다.

import ExcelJS from 'exceljs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const [inputPath = 'docs/운동DB_설계표.xlsx', outputPath = 'data/exercises.json'] =
  process.argv.slice(2)

const SHEET_NAME = '운동DB'
const HEADER_ROW = 2 // 1행: 영역 이름, 2행: 칸 이름, 3행부터 운동

// 엑셀 칸 이름 → JSON 키
const COLUMNS = {
  ID: 'id',
  '운동명(한)': 'nameKo',
  '운동명(영)': 'nameEn',
  분류: 'category',
  '목적 태그': 'tags',
  난이도: 'level',
  주동근: 'primaryMuscles',
  '협응근·안정근': 'secondaryMuscles',
  '관절·움직임': 'jointMovement',
  '3D 근육 ID': 'muscleModelIds',
  '역학 포인트': 'mechanics',
  '흔한 오류': 'commonErrors',
  '분석 기준각': 'referenceAngles',
  '수행 방법': 'howTo',
  '왜 하는가(원리)': 'why',
  '처방 기준(FITT)': 'fitt',
  '쉬운 버전': 'easier',
  '어려운 버전': 'harder',
  '재활 단계': 'rehabStage',
  '대상 부위·손상': 'targetArea',
  '금기·주의': 'cautions',
  '근거 출처': 'sources',
  '근거 수준': 'evidenceLevel',
  '확인 상태': 'status',
  검수자: 'reviewer',
  '최종 수정일': 'updatedAt',
  '영상 링크': 'videoUrl',
  이미지: 'image',
}

const PUBLISHED = '확인완료'
const UNVERIFIED_MARK = '확인필요'

// 엑셀 칸 값을 글자로 바꾼다 (서식 있는 글자, 링크, 수식, 날짜 모두 처리)
function cellText(value) {
  if (value == null) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'object') {
    if (Array.isArray(value.richText)) return value.richText.map((t) => t.text).join('').trim()
    if ('hyperlink' in value) return String(value.hyperlink ?? value.text ?? '').trim()
    if ('result' in value) return cellText(value.result)
    if ('text' in value) return String(value.text).trim()
  }
  return String(value).trim()
}

// 날짜 칸이 숫자 서식이면 엑셀 날짜 번호(예: 46296)로 읽힘 → 날짜로 바꿈
function excelDate(text) {
  if (!/^\d{5}(\.\d+)?$/.test(text)) return text
  const ms = Date.UTC(1899, 11, 30) + Number(text) * 86400000
  return new Date(ms).toISOString().slice(0, 10)
}

function splitList(text) {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

const workbook = new ExcelJS.Workbook()
await workbook.xlsx.readFile(inputPath)
const sheet = workbook.getWorksheet(SHEET_NAME)
if (!sheet) throw new Error(`'${SHEET_NAME}' 시트를 찾을 수 없어요: ${inputPath}`)

// 칸 이름으로 열 위치 찾기
const colIndex = {}
sheet.getRow(HEADER_ROW).eachCell((cell, col) => {
  const name = cellText(cell.value)
  if (COLUMNS[name]) colIndex[COLUMNS[name]] = col
})
const missing = Object.entries(COLUMNS)
  .filter(([, key]) => !colIndex[key])
  .map(([name]) => name)
if (missing.length) throw new Error(`엑셀에 없는 칸이 있어요: ${missing.join(', ')}`)

const exercises = []
const skipped = []
const hiddenCells = []
const seenIds = new Set()

for (let r = HEADER_ROW + 1; r <= sheet.rowCount; r++) {
  const row = sheet.getRow(r)
  const raw = {}
  for (const [key, col] of Object.entries(colIndex)) {
    const text = cellText(row.getCell(col).value)
    raw[key] = text === '-' ? '' : text // '-'는 빈칸으로 봄
  }

  raw.updatedAt = excelDate(raw.updatedAt)

  if (!raw.id) continue
  if (seenIds.has(raw.id)) throw new Error(`ID가 중복돼요: ${raw.id} (${r}행)`)
  seenIds.add(raw.id)

  if (raw.status !== PUBLISHED) {
    skipped.push(`${raw.id} ${raw.nameKo} — 확인 상태: ${raw.status || '(빈칸)'}`)
    continue
  }
  if (!raw.sources || raw.sources.includes(UNVERIFIED_MARK)) {
    skipped.push(`${raw.id} ${raw.nameKo} — 근거 출처 없음`)
    continue
  }

  // 확인필요 표시가 남은 칸은 공개하지 않음
  for (const [key, text] of Object.entries(raw)) {
    if (text.includes(UNVERIFIED_MARK)) {
      raw[key] = ''
      hiddenCells.push(`${raw.id} '${Object.keys(COLUMNS).find((n) => COLUMNS[n] === key)}'`)
    }
  }

  const { status: _status, reviewer: _reviewer, ...publicFields } = raw
  exercises.push({
    ...publicFields,
    tags: splitList(raw.tags),
    sources: raw.sources
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  })
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, JSON.stringify(exercises, null, 2) + '\n')

console.log(`✅ ${outputPath} 저장: 공개 운동 ${exercises.length}개`)
if (skipped.length) {
  console.log(`\n⏸  공개하지 않은 운동 ${skipped.length}개`)
  for (const s of skipped) console.log(`   - ${s}`)
}
if (hiddenCells.length) {
  console.log(`\n🙈 '확인필요'라서 숨긴 칸 ${hiddenCells.length}개`)
  for (const s of hiddenCells) console.log(`   - ${s}`)
}
