import { AppRoutes } from '@/lib/models/AppRoutes'
import { useAuthStore } from '@/lib/stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateLayout() {
  const user = useAuthStore(s => s.user)

  if (!user) {
    return <Navigate to={AppRoutes.muni.register.abs}/>
  }


  return (
    <Outlet/>
  )
}
