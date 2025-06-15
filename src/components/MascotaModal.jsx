import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { apiUrl } from '../config';

const MascotaModal = ({ visible, onClose, onMascotaGuardada, mascotaEditando }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    peso: '',
    observaciones: '',
    foto: null,
  });
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    if (mascotaEditando) {
      setFormData({
        nombre: mascotaEditando.nombre || '',
        edad: mascotaEditando.edad || '',
        peso: mascotaEditando.peso || '',
        observaciones: mascotaEditando.observaciones || '',
        foto: null,
      });
    } else {
      setFormData({
        nombre: '',
        edad: '',
        peso: '',
        observaciones: '',
        foto: null,
      });
    }
    setMensajeError('');
  }, [mascotaEditando]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');

    const form = new FormData();
    form.append('nombre', formData.nombre);
    form.append('edad', formData.edad);
    form.append('peso', formData.peso);
    form.append('observaciones', formData.observaciones);
    form.append('id_usuario', user.id);
    if (formData.foto) {
      form.append('foto', formData.foto);
    }

    const url = mascotaEditando
      ? `${apiUrl}/mascotas/${mascotaEditando._id}`
      : `${apiUrl}/mascotas`;

    const method = mascotaEditando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar mascota');

      onMascotaGuardada(data);
      onClose();
    } catch (err) {
      setMensajeError(err.message);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1055, // Asegura que esté por encima del navbar
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">
                {mascotaEditando ? 'Editar Mascota' : 'Nueva Mascota'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="form-control mb-2"
                required
              />
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Edad"
                className="form-control mb-2"
                required
              />
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                placeholder="Peso (kg)"
                className="form-control mb-2"
                required
              />
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="Observaciones"
                className="form-control mb-2"
              />
              <input
                type="file"
                name="foto"
                onChange={handleChange}
                className="form-control mb-2"
                accept="image/*"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {mascotaEditando ? 'Guardar Cambios' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MascotaModal;
