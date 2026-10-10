import { Link } from 'react-router-dom'
import { exercises } from '../exercises'

export default function ExerciseListPage() {
  return (
    <section className="page">
      <h1>운동 목록</h1>

      {exercises.length === 0 ? (
        <div className="card empty">
          <p>아직 공개된 운동이 없어요.</p>
          <span className="muted">근거 확인을 마친 운동부터 차례로 올라와요.</span>
        </div>
      ) : (
        <ul className="card-list">
          {exercises.map((ex) => (
            <li key={ex.id}>
              <Link to={`/exercises/${ex.id}`} className="card card-link">
                <strong>{ex.nameKo}</strong>
                <span className="muted">
                  {[ex.category, ex.level].filter(Boolean).join(' · ')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
