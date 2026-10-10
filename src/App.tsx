import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExerciseListPage from './pages/ExerciseListPage'
import ExerciseDetailPage from './pages/ExerciseDetailPage'
import MyRoutinePage from './pages/MyRoutinePage'
import NotFoundPage from './pages/NotFoundPage'

// 화면 주소(라우트) 목록
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        <Route path="/routine" element={<MyRoutinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
