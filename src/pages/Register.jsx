import React, { useState } from 'react'

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    ubicacion: '',
  })
  const [mensaje, setMensaje] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error')

      setMensaje('¡Registro exitoso!')
      setForm({ nombre: '', email: '', password: '', edad: '', ubicacion: '' })
    } catch (err) {
      setMensaje(err.message)
    }
  }

  return (
    <div className="card p-4 shadow">
      <h2>Registro</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="form-control mb-2" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="form-control mb-2" value={form.password} onChange={handleChange} required />
        <input type="number" name="edad" placeholder="Edad" className="form-control mb-2" value={form.edad} onChange={handleChange} />
        <input type="text" name="ubicacion" placeholder="Ubicación" className="form-control mb-2" value={form.ubicacion} onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  )
}

export default Register
