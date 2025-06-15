import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./MisCitas.css";

import { apiUrl } from '../config';

const MisCitas = () => {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      let url = `${apiUrl}/citas?`;
      if (user.rol === "usuario") {
        url += `id_cliente=${user.id}`;
      } else if (user.rol === "administrador") {
        url += `id_profesional=${user.id}`;
      }

      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setCitas(data);
    };

    fetchCitas();
  }, [user]);

  return (
    <div className="container custom-container">
      <h2 className="text-center mb-4">
        {user.rol === "usuario" ? "Mis Citas" : "Citas a Atender"}
      </h2>

      {citas.length === 0 ? (
        <div className="alert alert-warning text-center">
          No tienes citas programadas.
        </div>
      ) : (
        <div className="row g-4">
          {citas.map((cita) => {
            const fecha = new Date(cita.tramo);
            return (
              <div key={cita._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 cita-card">
                  <div className="card-body">
                    <h5 className="card-title text-primary mb-2">
                      {cita.id_servicio?.nombre}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Fecha:</strong> {fecha.toLocaleDateString()}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Hora:</strong>{" "}
                      {fecha.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Mascota:</strong> {cita.id_mascota?.nombre}
                    </p>
                    <p className="card-text mb-0">
                      <strong>
                        {user.rol === "usuario" ? "Profesional" : "Cliente"}:
                      </strong>{" "}
                      {user.rol === "usuario"
                        ? cita.id_profesional?.nombre
                        : cita.id_cliente?.nombre}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MisCitas;
