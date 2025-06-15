import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MascotaModal from '../components/MascotaModal';
import './MisMascotas.css';

import { apiUrl } from '../config';

const MisMascotas = () => {
  const { user } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await fetch(`${apiUrl}/mascotas?id_usuario=${user.id}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al obtener mascotas');
        const data = await res.json();
        const filtradas = data.filter(m => m.id_usuario._id === user.id);
        setMascotas(filtradas);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMascotas();
  }, [user]);

  const handleMascotaGuardada = (mascota) => {
    if (mascotaEditando) {
      setMascotas(prev => prev.map(m => m._id === mascota._id ? mascota : m));
    } else {
      setMascotas(prev => [...prev, mascota]);
    }
    setMascotaEditando(null);
  };

  const handleEditar = (mascota) => {
    setMascotaEditando(mascota);
    setModalVisible(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta mascota?')) return;

    try {
      const res = await fetch(`${apiUrl}/mascotas/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');

      setMascotas(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar la mascota');
    }
  };

  return (
    <div className="container custom-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2 py-5">
        <h2 className="mb-0">Mis Mascotas</h2>
        <button
          className="btn btn-outline-primary btn-sm custom-button"
          onClick={() => {
            setMascotaEditando(null);
            setModalVisible(true);
          }}
        >
          ➕ Añadir Mascota
        </button>
      </div>

      {loading ? (
        <p>Cargando mascotas...</p>
      ) : mascotas.length === 0 ? (
        <p>No tienes mascotas registradas.</p>
      ) : (
        <div className="row">
          {mascotas.map((mascota, index) => (
            <div className="col-md-4 mb-4 fade-in" key={mascota._id} style={{ animationDelay: `${index * 100}ms` }}>
              <div className="card shadow-sm h-100 rounded-4 border-0 overflow-hidden">
                {mascota.foto && (
                  <img
                    src={`http://localhost:4000${mascota.foto}`}
                    className="card-img-top rounded-top-4 object-fit-cover"
                    alt={mascota.nombre}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{mascota.nombre}</h5>
                    <p className="card-text mb-1"><strong>Edad:</strong> {mascota.edad}</p>
                    <p className="card-text mb-1"><strong>Peso:</strong> {mascota.peso} kg</p>
                    <p className="card-text text-muted">{mascota.observaciones}</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary custom-button"
                      onClick={() => handleEditar(mascota)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger custom-button"
                      onClick={() => handleEliminar(mascota._id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MascotaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onMascotaGuardada={handleMascotaGuardada}
        mascotaEditando={mascotaEditando}
      />
    </div>
  );
};

export default MisMascotas;
