import RoutesWithNotFound from '../../components/RoutesWitthNotFound/RoutesWithNotFound'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import { AppRoutes } from '../../lib/models/AppRoutes'

export default function PrivateRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path={AppRoutes.private.dashboard.name} element={<Dashboard/>}/>
    </RoutesWithNotFound>
  )
}
