# 무브로직 (MoveLogic)

왜 하는지 이해하는 운동 가이드 웹앱.

## 실행 방법

```bash
npm install      # 처음 한 번
npm run dev      # 개발 서버 실행 → 터미널에 나온 주소(보통 http://localhost:5173) 열기
npm run build    # 배포용 빌드 확인
```

## 폴더 구조

- `src/pages/` — 화면 (홈, 운동 목록, 운동 상세, 내 루틴)
- `src/components/` — 공통 틀(Layout), 하단 탭바(TabBar)
- `src/config.ts` — 앱 이름 (이름 바꿀 때 여기만 수정)
- `data/` — 운동 데이터 (2단계에서 추가)
- `docs/` — 운동DB 설계표, 라이선스 기록
