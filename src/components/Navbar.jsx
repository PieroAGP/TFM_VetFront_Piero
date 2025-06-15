import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi App</Link>

        {/* Contenedor que empuja los botones a la derecha */}
        <div className="ms-auto d-flex align-items-center">
          {user?.rol && (
            <Link to="/servicios" className="btn btn-outline-light me-3">
              Servicios
            </Link>
          )}

          {(user?.rol === 'usuario' || user?.rol === 'administrador') && (
            <div className="dropdown me-3">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="actionsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mis Acciones
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="actionsDropdown">
                {user.rol === 'usuario' && (
                  <>
                    <li><Link className="dropdown-item" to="/mis-mascotas">Mis Mascotas</Link></li>
                    <li><Link className="dropdown-item" to="/crear-cita">Crear Cita</Link></li>
                    <li><Link className="dropdown-item" to="/mis-citas">Mis Citas</Link></li>
                  </>
                )}
                {user.rol === 'administrador' && (
                  <li><Link className="dropdown-item" to="/mis-citas">Citas a Atender</Link></li>
                )}
              </ul>
            </div>
          )}

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Register</Link>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.nombre}
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="userDropdown">
                <li><button className="dropdown-item" onClick={logout}>Cerrar sesión</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
