import { Link } from 'react-router-dom'

export default function MyRoutinePage() {
  return (
    <section className="page">
      <h1>내 루틴</h1>
      <div className="card empty">
        <p>아직 루틴이 없어요.</p>
        <Link to="/exercises" className="button">
          운동 둘러보기
        </Link>
      </div>
    </section>
  )
}
