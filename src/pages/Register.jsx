import React, { useState } from 'react';
import './Register.css';
import { apiUrl } from '../config';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    ubicacion: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      setMensaje('¡Registro exitoso!');
      setForm({ nombre: '', email: '', password: '', edad: '', ubicacion: '' });
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F1EFEC' }}>
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4">Crear Cuenta</h3>
        {mensaje && <div className={`alert ${mensaje.includes('exitoso') ? 'alert-success' : 'alert-danger'}`}>{mensaje}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              className="form-control"
              value={form.edad}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación"
              className="form-control"
              value={form.ubicacion}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
