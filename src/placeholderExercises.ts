// 화면 이동 확인용 임시 자리 표시 데이터입니다. 실제 운동 정보가 아닙니다.
// 2단계에서 data/exercises.json(확인완료 운동만)으로 바뀝니다.
export type PlaceholderExercise = {
  id: string
  name: string
}

export const placeholderExercises: PlaceholderExercise[] = [
  { id: 'sample-1', name: '예시 운동 1' },
  { id: 'sample-2', name: '예시 운동 2' },
  { id: 'sample-3', name: '예시 운동 3' },
]
