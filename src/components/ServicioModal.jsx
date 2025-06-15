import React, { useEffect, useState } from 'react';

const ServicioModal = ({ visible, onClose, onServicioGuardado, servicioEditando }) => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    costo: '',
    duracion: '',
  });
  const [mensajeForm, setMensajeForm] = useState('');

  useEffect(() => {
    if (servicioEditando) {
      setForm({
        nombre: servicioEditando.nombre || '',
        descripcion: servicioEditando.descripcion || '',
        costo: servicioEditando.costo || '',
        duracion: servicioEditando.duracion || '',
      });
    } else {
      setForm({ nombre: '', descripcion: '', costo: '', duracion: '' });
    }
    setMensajeForm('');
  }, [servicioEditando]);

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeForm('');

    const url = servicioEditando
      ? `http://localhost:4000/servicios/${servicioEditando._id}`
      : 'http://localhost:4000/servicios';

    const method = servicioEditando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar el servicio');

      onServicioGuardado(data);
      onClose();
    } catch (err) {
      setMensajeForm(err.message);
    }
  };

  if (!visible) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                {servicioEditando ? '✏️ Editar Servicio' : '➕ Nuevo Servicio'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {mensajeForm && (
                <div className="alert alert-danger rounded-3">{mensajeForm}</div>
              )}

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre del servicio"
                  value={form.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  placeholder="Describe brevemente el servicio"
                  value={form.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Costo</label>
                  <input
                    type="number"
                    name="costo"
                    className="form-control"
                    placeholder="Ej: 25.00"
                    value={form.costo}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Duración (minutos)</label>
                  <input
                    type="number"
                    name="duracion"
                    className="form-control"
                    placeholder="Ej: 45"
                    value={form.duracion}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary rounded-pill">
                {servicioEditando ? 'Guardar cambios' : 'Crear servicio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicioModal;
