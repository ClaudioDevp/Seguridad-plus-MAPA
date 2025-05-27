import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './components/RoutesWitthNotFound/RoutesWithNotFound';
import { AppRoutes } from './lib/models/AppRoutes';
import Landing from './app/Landing/Landing';
import Register from './app/Register/Register';
import DownloadApp from './app/DownloadApp/DownloadApp';



function App() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Landing />} />
        <Route path={AppRoutes.app.abs} element={<Navigate to={AppRoutes.app.download.abs} />} />
        <Route path={AppRoutes.app.register.abs} element={<Register />} />
        <Route path={AppRoutes.app.download.abs} element={<DownloadApp />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  )
}

export default App;
