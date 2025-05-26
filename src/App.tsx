import { useEffect } from 'react';

import { useAuthStore } from './stores/authStore';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './components/RoutesWitthNotFound/RoutesWithNotFound';
import Login from './app/public/Login/Login';
import PrivateRoutes from './app/private/PrivateRoutes';
import { AppRoutes } from './models/AppRoutes';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';

function App() {
  const syncSession = useAuthStore(s => s.syncSession)

  useEffect(() => {
    const uns = syncSession()
    return () => uns()
  }, [syncSession])

  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={AppRoutes.login.abs} />} />
        <Route path={AppRoutes.login.abs} element={<Login />} />
        <Route element={<PrivateLayout />}>
          <Route path={`${AppRoutes.private.absolute}/*`} element={<PrivateRoutes />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  )
}

export default App;
