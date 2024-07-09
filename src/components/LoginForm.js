import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/descarga.png'; // Importa tu logo aquí

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ((username === '00742731' && password === '123456') || (username === '00647166' && password === '123456')) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      window.location.href = "/dashboard";
    } else {
      alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
      window.location.href = "/";
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ height: '60px' }} />
              </div>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuario (ID):</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
