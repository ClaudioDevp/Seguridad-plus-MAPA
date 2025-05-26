import { useEffect } from 'react';

import { useAuthStore } from './lib/stores/authStore';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesWithNotFound from './components/RoutesWitthNotFound/RoutesWithNotFound';
import Login from './app/public/MuniPage/Login/Login';
import PrivateRoutes from './app/private/PrivateRoutes';
import { AppRoutes } from './lib/models/AppRoutes';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import Landing from './app/public/Landing/Landing';
import Register from './app/public/AppPage/Register/Register';
import RegisterMuni from './app/public/MuniPage/RegisterMuni/RegisterMuni';

function App() {
  const syncSession = useAuthStore(s => s.syncSession)

  useEffect(() => {
    const uns = syncSession()
    return () => uns()
  }, [syncSession])

  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path={AppRoutes.app.register.abs} element={<Register />} />

        <Route path={AppRoutes.muni.login.abs} element={<Login />} />
        <Route path={AppRoutes.muni.register.abs} element={<RegisterMuni />} />

        <Route path={AppRoutes.landing.abs} element={<Landing />} />
        <Route element={<PrivateLayout />}>
          <Route path={`${AppRoutes.private.abs}/*`} element={<PrivateRoutes />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  )
}

export default App;
