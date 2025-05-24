// src/components/Login.jsx
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import LogoMaullin from '../components/img/lo_maullin.png';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Usuario autenticado');
    } catch (error) {
      alert('❌ Error en login: ' + error.message);
    }
  };

  return (
    <div className="full-height-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src={LogoMaullin} alt="Logo" className="logo" />
        </div>
        <div className="login-body">
          <form onSubmit={loginUser}>
            <div className="form-group">
              <input type="email" placeholder="Usuario" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}
