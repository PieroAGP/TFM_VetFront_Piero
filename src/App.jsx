import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Servicios from './pages/Servicios';
import MisMascotas from './pages/MisMascotas';
import CrearCita from './pages/CrearCita';
import MisCitas from './pages/MisCitas';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/mis-mascotas" element={<MisMascotas />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/mis-citas" element={<MisCitas />} />
      </Routes>
    </>
  );
}

export default App;
