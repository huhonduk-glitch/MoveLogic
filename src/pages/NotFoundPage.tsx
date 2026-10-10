import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page">
      <h1>페이지를 찾을 수 없어요</h1>
      <Link to="/" className="button">
        홈으로
      </Link>
    </section>
  )
}
