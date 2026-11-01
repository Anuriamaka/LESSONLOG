import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Homework from './pages/Homework'
import Week from './pages/Week'

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/lessons" element={<Week />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/payments" element={<div className="text-muted">Payments page: build next.</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
