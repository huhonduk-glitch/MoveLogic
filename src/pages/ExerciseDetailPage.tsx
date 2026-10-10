import { Link, useParams } from 'react-router-dom'
import { placeholderExercises } from '../placeholderExercises'
import NotFoundPage from './NotFoundPage'

// 나중에 채울 영역 (운동DB_설계표.xlsx의 영역 구분을 따름)
const sections = ['해부학', '역학', '설명·가이드', '재활·안전', '근거 출처']

export default function ExerciseDetailPage() {
  const { id } = useParams()
  const exercise = placeholderExercises.find((ex) => ex.id === id)

  if (!exercise) return <NotFoundPage />

  return (
    <section className="page">
      <Link to="/exercises" className="back-link">
        ← 운동 목록
      </Link>
      <h1>{exercise.name}</h1>

      {sections.map((title) => (
        <div key={title} className="card">
          <strong>{title}</strong>
          <span className="muted">준비 중</span>
        </div>
      ))}
    </section>
  )
}
