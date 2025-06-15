import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach(el => el && observer.observe(el));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero-section text-white">
        <div className="overlay">
          <h1>Bienvenido a VetCare{user ? `, ${user.nombre}` : ''}</h1>
          <p>Tu veterinaria de confianza para el cuidado de tus mascotas</p>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="quienes-somos">
        <h2>¿Quiénes somos?</h2>

        <div className="qs-block" ref={el => (sectionsRef.current[0] = el)}>
          <div className="qs-text animate-left">
            <h3>Pasión por los animales</h3>
            <p>En VetCare nos mueve el amor por los animales...</p>
          </div>
          <div className="qs-img animate-right">
            <img src="/img/br1fk.jpg" alt="Pasión por los animales" />
          </div>
        </div>

        <div className="qs-block reverse" ref={el => (sectionsRef.current[1] = el)}>
          <div className="qs-text animate-right">
            <h3>Equipamiento moderno</h3>
            <p>Contamos con tecnología de última generación...</p>
          </div>
          <div className="qs-img animate-left">
            <img src="/img/br1fk.jpg" alt="Tecnología" />
          </div>
        </div>

        <div className="qs-block" ref={el => (sectionsRef.current[2] = el)}>
          <div className="qs-text animate-left">
            <h3>Atención personalizada</h3>
            <p>Cada mascota recibe el trato único que merece...</p>
          </div>
          <div className="qs-img animate-right">
            <img src="/img/br1fk.jpg" alt="Atención personalizada" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} VetCare. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Home;
