// 운동 데이터: data/exercises.json (npm run convert 로 엑셀에서 만들어짐)
// 변환 스크립트가 '확인완료' + 근거 출처가 있는 운동만 넣는다.
import data from '../data/exercises.json'

export type Exercise = {
  id: string
  nameKo: string
  nameEn: string
  category: string
  tags: string[]
  level: string
  primaryMuscles: string
  secondaryMuscles: string
  jointMovement: string
  muscleModelIds: string
  mechanics: string
  commonErrors: string
  referenceAngles: string
  howTo: string
  why: string
  fitt: string
  easier: string
  harder: string
  rehabStage: string
  targetArea: string
  cautions: string
  sources: string[]
  evidenceLevel: string
  updatedAt: string
  videoUrl: string
  image: string
}

export const exercises: Exercise[] = data as Exercise[]

export function findExercise(id: string | undefined) {
  return exercises.find((ex) => ex.id === id)
}
