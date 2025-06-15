import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import './CrearCita.css';

const CrearCita = () => {
  const { user } = useAuth();

  const [profesionales, setProfesionales] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [tramosDisponibles, setTramosDisponibles] = useState([]);

  const [form, setForm] = useState({
    id_profesional: "",
    id_mascota: "",
    id_servicio: "",
    fecha: "",
    tramo: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Profesionales
        const resProfesionales = await fetch(
          `http://localhost:4000/users?rol=administrador`,
          {
            credentials: "include",
          }
        );
        const dataProfesionales = await resProfesionales.json();
        setProfesionales(dataProfesionales);

        // Mascotas del usuario
        const resMascotas = await fetch(
          `http://localhost:4000/mascotas?id_usuario=${user.id}`,
          {
            credentials: "include",
          }
        );
        const dataMascotas = await resMascotas.json();
        const filtradas = dataMascotas.filter(
          (m) => m.id_usuario._id === user.id
        );
        setMascotas(filtradas);

        // Servicios
        const resServicios = await fetch(`http://localhost:4000/servicios`, {
          credentials: "include",
        });
        const dataServicios = await resServicios.json();
        setServicios(dataServicios);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, [user.id]);

  // Cargar tramos disponibles cuando cambian fecha, profesional o servicio
  useEffect(() => {
    const fetchTramos = async () => {
      if (!form.fecha || !form.id_profesional || !form.id_servicio) return;

      try {
        const servicio = servicios.find((s) => s._id === form.id_servicio);
        if (!servicio) return;

        const res = await fetch(
          `http://localhost:4000/citas/disponibles?id_profesional=${form.id_profesional}&fecha=${form.fecha}&duracion=${servicio.duracion}`
        );
        const data = await res.json();
        setTramosDisponibles(data);
      } catch (err) {
        console.error("Error al obtener tramos:", err);
        setTramosDisponibles([]);
      }
    };

    fetchTramos();
  }, [form.fecha, form.id_profesional, form.id_servicio, servicios]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje("");

  try {
    const tramoDate = new Date(form.tramo);
    if (isNaN(tramoDate)) {
      setMensaje("❌ Tramo horario inválido");
      return;
    }

    const res = await fetch("http://localhost:4000/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id_cliente: user.id,
        id_profesional: form.id_profesional,
        id_mascota: form.id_mascota,
        id_servicio: form.id_servicio,
        tramo: tramoDate.toISOString(),
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al crear cita");

    window.location.href = "/";
    setTramosDisponibles([]);
  } catch (err) {
    console.error(err);
    setMensaje("❌ Error al crear cita");
  }
};

  return (
    <div className="container custom-container">
      <h2>Crear nueva cita</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Profesional</label>
          <select
            name="id_profesional"
            className="form-select"
            value={form.id_profesional}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un profesional</option>
            {profesionales.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Mascota</label>
          <select
            name="id_mascota"
            className="form-select"
            value={form.id_mascota}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una mascota</option>
            {mascotas.map((m) => (
              <option key={m._id} value={m._id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Servicio</label>
          <select
            name="id_servicio"
            className="form-select"
            value={form.id_servicio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((s) => (
              <option key={s._id} value={s._id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tramo horario</label>
          <select
            name="tramo"
            className="form-select"
            value={form.tramo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tramo disponible</option>
            {tramosDisponibles.map((t, idx) => (
              <option key={idx} value={t}>
                {new Date(t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Cita
        </button>
      </form>

      {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}
    </div>
  );
};

export default CrearCita;
