import { Link } from 'react-router-dom'
import { APP_NAME, APP_NAME_EN, APP_TAGLINE } from '../config'

export default function HomePage() {
  return (
    <section className="page">
      <h1>{APP_NAME}</h1>
      <p className="muted">
        {APP_NAME_EN} · {APP_TAGLINE}
      </p>

      <div className="card-list">
        <Link to="/exercises" className="card card-link">
          <strong>운동 둘러보기</strong>
          <span className="muted">운동 목록과 설명을 확인해요</span>
        </Link>
        <Link to="/routine" className="card card-link">
          <strong>내 루틴</strong>
          <span className="muted">내가 고른 운동을 모아 봐요</span>
        </Link>
      </div>

      <p className="notice">
        이 앱은 교육용 운동 가이드입니다. 통증이 있으면 전문가와 상담하세요.
      </p>
    </section>
  )
}
