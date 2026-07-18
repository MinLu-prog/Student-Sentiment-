import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function AdminRoute() {
  const { isGuest, user } = useAuth()

  if (isGuest) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/blog" replace />
  }

  return <Outlet />
}
