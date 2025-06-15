import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ServicioModal from '../components/ServicioModal';

import './Servicios.css'; 
import { apiUrl } from '../config';

const Servicios = () => {
  const { user } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [servicioEditando, setServicioEditando] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await fetch(`${apiUrl}/servicios`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Error al cargar los servicios');
        const data = await res.json();
        setServicios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const handleServicioGuardado = (servicio) => {
    setServicios(prev =>
      servicioEditando
        ? prev.map(s => (s._id === servicio._id ? servicio : s))
        : [...prev, servicio]
    );
    setServicioEditando(null);
  };

  const handleEditar = (servicio) => {
    setServicioEditando(servicio);
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este servicio?')) return;
    try {
      const res = await fetch(`${apiUrl}/servicios/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');
      setServicios(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container py-5 custom-container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-bold text-primary">Nuestros Servicios</h2>
        {(user?.rol === 'administrador' || user?.rol === 'absoluteAdmin') && (
          <button
            className="btn btn-outline-primary custom-button"
            onClick={() => {
              setServicioEditando(null);
              setShowModal(true);
            }}
          >
            ➕ Añadir servicio
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Cargando servicios...</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : servicios.length === 0 ? (
        <p className="text-muted">No hay servicios disponibles actualmente.</p>
      ) : (
        <div className="row">
          {servicios.map((servicio, index) => (
            <div
              className="col-md-6 col-lg-4 mb-4 fade-in"
              key={servicio._id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card shadow-sm h-100 rounded-4 border-0 overflow-hidden">
                {servicio.imagenUrl && (
                  <img
                    src={`http://localhost:4000${servicio.imagenUrl}`}
                    alt={servicio.nombre}
                    className="card-img-top object-fit-cover"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-dark">{servicio.nombre}</h5>
                    <p className="card-text text-muted">{servicio.descripcion}</p>
                    <p className="card-text mb-1">
                      <strong>Costo:</strong> €{servicio.costo}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Duración:</strong> {servicio.duracion} minutos
                    </p>
                  </div>

                  {(user?.rol === 'administrador' || user?.rol === 'absoluteAdmin') && (
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-sm btn-outline-primary custom-button"
                        onClick={() => handleEditar(servicio)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger custom-button"
                        onClick={() => handleEliminar(servicio._id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ServicioModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onServicioGuardado={handleServicioGuardado}
        servicioEditando={servicioEditando}
      />
    </div>
  );
};

export default Servicios;
