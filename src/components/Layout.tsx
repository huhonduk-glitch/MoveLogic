import { Link, Outlet } from 'react-router-dom'
import { APP_NAME } from '../config'
import TabBar from './TabBar'

// 모든 화면에 공통으로 들어가는 틀: 위쪽 제목줄 + 본문 + 아래쪽 탭바
export default function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-title">
          {APP_NAME}
        </Link>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
