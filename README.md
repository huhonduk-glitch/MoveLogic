# 무브로직 (MoveLogic)

왜 하는지 이해하는 운동 가이드 웹앱.

## 실행 방법

```bash
npm install      # 처음 한 번
npm run dev      # 개발 서버 실행 → 터미널에 나온 주소(보통 http://localhost:5173) 열기
npm run build    # 배포용 빌드 확인
npm run convert  # 엑셀(docs/운동DB_설계표.xlsx) → data/exercises.json 변환
```

## 운동 데이터 고치는 법

1. `docs/운동DB_설계표.xlsx`를 수정
2. `npm run convert` 실행 → `data/exercises.json`이 새로 만들어짐
3. 둘 다 커밋 → 머지하면 앱에 반영

앱에 공개되는 운동: **'확인 상태' = 확인완료** 이고 **'근거 출처'가 있는** 운동만.
- '근거 출처' 칸에 출처가 여러 개면 한 줄에 하나씩 (Alt+Enter로 줄바꿈)
- 칸 안에 "확인필요"라고 적힌 내용은 공개하지 않음
- 검수자 이름은 JSON에 넣지 않음

## 폴더 구조

- `src/pages/` — 화면 (홈, 운동 목록, 운동 상세, 내 루틴)
- `src/components/` — 공통 틀(Layout), 하단 탭바(TabBar)
- `src/config.ts` — 앱 이름 (이름 바꿀 때 여기만 수정)
- `data/exercises.json` — 앱이 읽는 운동 데이터 (직접 고치지 말고 `npm run convert`로 만들기)
- `scripts/` — 변환 스크립트
- `docs/` — 운동DB 설계표, 라이선스 기록
