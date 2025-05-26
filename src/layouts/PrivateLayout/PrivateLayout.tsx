import { AppRoutes } from '@/models/AppRoutes'
import { useAuthStore } from '@/stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateLayout() {
  const user = useAuthStore(s => s.user)

  if (!user) {
    return <Navigate to={AppRoutes.login.abs}/>
  }


  return (
    <Outlet/>
  )
}
