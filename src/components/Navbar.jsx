import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar px-4 ">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src='/img/huella.png'
            alt="VetCare Logo"
            height="30"
            style={{ objectFit: "contain" }}
          />
          <span className="fw-bold">VetCare</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {user?.rol && (
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">
                  Servicios
                </Link>
              </li>
            )}

            {(user?.rol === "usuario" || user?.rol === "administrador") && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle"
                  id="accionesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mis Acciones
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {user.rol === "usuario" && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/mis-mascotas">
                          Mis Mascotas
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/crear-cita">
                          Crear Cita
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/mis-citas">
                          Mis Citas
                        </Link>
                      </li>
                    </>
                  )}
                  {user.rol === "administrador" && (
                    <li>
                      <Link className="dropdown-item" to="/mis-citas">
                        Citas a Atender
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-dark" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-dark dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
