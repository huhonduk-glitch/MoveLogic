import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/exercises', label: '운동', icon: '💪', end: false },
  { to: '/routine', label: '내 루틴', icon: '📋', end: false },
]

export default function TabBar() {
  return (
    <nav className="tab-bar" aria-label="주요 메뉴">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
        >
          <span className="tab-icon" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
