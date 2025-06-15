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
            <p>En VetCare, nuestra vocación nace del amor incondicional hacia los animales. Cada ladrido, ronroneo o mirada nos inspira a brindar un servicio veterinario compasivo, responsable y ético. Nos comprometemos con su bienestar como si fueran parte de nuestra propia familia.</p>
          </div>
          <div className="qs-img animate-right">
            <img src="/img/rec1.jpg" alt="Pasión por los animales" />
          </div>
        </div>

        <div className="qs-block reverse" ref={el => (sectionsRef.current[1] = el)}>
          <div className="qs-text animate-right">
            <h3>Equipamiento moderno</h3>
            <p>Disponemos de instalaciones de vanguardia con equipos de diagnóstico y tratamiento de última generación. Desde análisis clínicos rápidos hasta quirófanos completamente equipados, garantizamos una atención segura, precisa y eficiente para cada mascota.</p>
          </div>
          <div className="qs-img animate-left">
            <img src="/img/ter3.jpg" alt="Tecnología" />
          </div>
        </div>

        <div className="qs-block" ref={el => (sectionsRef.current[2] = el)}>
          <div className="qs-text animate-left">
            <h3>Atención personalizada</h3>
            <p>Creemos que cada animal es único, por eso ofrecemos planes de cuidado adaptados a sus necesidades individuales. Nuestro equipo médico toma el tiempo necesario para conocer a tu mascota, generar confianza y diseñar un tratamiento que promueva su salud a largo plazo.</p>
          </div>
          <div className="qs-img animate-right">
            <img src="/img/terc.jpg" alt="Atención personalizada" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} VetCare. TFM-Piero Gabino.</p>
      </footer>
    </>
  );
};

export default Home;
