// pages/CitaDetalle.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiUrl } from '../config';

const CitaDetalle = () => {
  const { id } = useParams();
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      const res = await fetch(`${apiUrl}/citas?id=${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setCita(Array.isArray(data) ? data[0] : data);
    };

    fetchCita();
  }, [id]);

  if (!cita) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h2>Detalle de la Cita</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item">Fecha: {new Date(cita.tramo).toLocaleDateString()}</li>
        <li className="list-group-item">Hora: {new Date(cita.tramo).toLocaleTimeString()}</li>
        <li className="list-group-item">Servicio: {cita.id_servicio?.nombre}</li>
        <li className="list-group-item">Duración: {cita.id_servicio?.duracion} min</li>
        <li className="list-group-item">Mascota: {cita.id_mascota?.nombre}</li>
        <li className="list-group-item">Cliente: {cita.id_cliente?.nombre}</li>
        <li className="list-group-item">Profesional: {cita.id_profesional?.nombre}</li>
      </ul>
    </div>
  );
};

export default CitaDetalle;
