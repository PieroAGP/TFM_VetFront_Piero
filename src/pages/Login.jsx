import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
      const res = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      // Obtener sesión actual
      const session = await fetch('http://localhost:4000/users/session', {
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
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2>Login</h2>
        {mensaje && <div className="alert alert-info">{mensaje}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" className="form-control mb-2" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" className="form-control mb-2" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
