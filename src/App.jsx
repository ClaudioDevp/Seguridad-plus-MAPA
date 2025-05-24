import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe(); // Limpiar al desmontar
  }, []);

  if (loading) return 
  {loading && (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner"></div>
        Cargando...
      </div>
    </div>
  )}

  return user ? <Dashboard user={user} /> : <Login />;
}

export default App;
