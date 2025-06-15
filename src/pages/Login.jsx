import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

import { apiUrl } from '../config';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      const session = await fetch(`${apiUrl}/users/session`, {
        credentials: 'include',
      });

      const sessionData = await session.json();
      if (session.ok) {
        setUser(sessionData.user);
        navigate('/');
      }
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F1EFEC' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {mensaje && <div className="alert alert-danger">{mensaje}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
