import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findExercise, type Exercise } from '../exercises'
import NotFoundPage from './NotFoundPage'

const REHAB_STAGES: Record<string, string> = {
  '1': '1단계 보호기',
  '2': '2단계 가동범위',
  '3': '3단계 근력',
  '4': '4단계 기능·복귀',
}

type Field = { label: string; key: keyof Exercise }

// 운동DB_설계표.xlsx의 영역 구분을 따름. 빈 칸은 화면에 표시하지 않음.
const sections: { title: string; fields: Field[] }[] = [
  {
    title: '해부학',
    fields: [
      { label: '주동근', key: 'primaryMuscles' },
      { label: '협응근·안정근', key: 'secondaryMuscles' },
      { label: '관절·움직임', key: 'jointMovement' },
    ],
  },
  {
    title: '역학',
    fields: [
      { label: '역학 포인트', key: 'mechanics' },
      { label: '흔한 오류', key: 'commonErrors' },
    ],
  },
  {
    title: '설명·가이드',
    fields: [
      { label: '수행 방법', key: 'howTo' },
      { label: '왜 하는가', key: 'why' },
      { label: '운동 기준(FITT)', key: 'fitt' },
      { label: '쉬운 버전', key: 'easier' },
      { label: '어려운 버전', key: 'harder' },
    ],
  },
  {
    title: '안전',
    fields: [
      { label: '대상 부위', key: 'targetArea' },
      { label: '금기·주의', key: 'cautions' },
    ],
  },
]

// 글 안의 http 주소를 누를 수 있는 링크로 바꿈
function withLinks(text: string): ReactNode[] {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="text-link">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

export default function ExerciseDetailPage() {
  const { id } = useParams()
  const ex = findExercise(id)

  if (!ex) return <NotFoundPage />

  const rehab = REHAB_STAGES[ex.rehabStage]

  return (
    <section className="page">
      <Link to="/exercises" className="back-link">
        ← 운동 목록
      </Link>
      <div>
        <h1>{ex.nameKo}</h1>
        {ex.nameEn && <p className="muted">{ex.nameEn}</p>}
      </div>

      <div className="chips">
        {[...new Set([ex.category, ex.level, rehab, ...ex.tags])].filter(Boolean).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {sections.map(({ title, fields }) => {
        const filled = fields.filter((f) => ex[f.key])
        if (filled.length === 0) return null
        return (
          <div key={title} className="card">
            <h2>{title}</h2>
            <dl className="fields">
              {filled.map((f) => (
                <div key={f.key}>
                  <dt>{f.label}</dt>
                  <dd>{withLinks(String(ex[f.key]))}</dd>
                </div>
              ))}
            </dl>
          </div>
        )
      })}

      {rehab && (
        <p className="notice">통증이 있으면 운동을 멈추고 전문가와 상담하세요.</p>
      )}

      {/* 근거 출처는 항상 표시 */}
      <div className="card sources">
        <h2>근거 출처</h2>
        <ul>
          {ex.sources.map((s) => (
            <li key={s}>{withLinks(s)}</li>
          ))}
        </ul>
        {ex.evidenceLevel && <span className="muted">근거 수준: {ex.evidenceLevel}</span>}
        {ex.updatedAt && <span className="muted">최종 수정: {ex.updatedAt}</span>}
      </div>
    </section>
  )
}
