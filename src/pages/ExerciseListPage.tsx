import { Link } from 'react-router-dom'
import { placeholderExercises } from '../placeholderExercises'

export default function ExerciseListPage() {
  return (
    <section className="page">
      <h1>운동 목록</h1>
      <p className="muted">준비 중 — 지금은 화면 이동 확인용 예시만 있어요.</p>

      <ul className="card-list">
        {placeholderExercises.map((ex) => (
          <li key={ex.id}>
            <Link to={`/exercises/${ex.id}`} className="card card-link">
              <strong>{ex.name}</strong>
              <span className="muted">자세히 보기 →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
