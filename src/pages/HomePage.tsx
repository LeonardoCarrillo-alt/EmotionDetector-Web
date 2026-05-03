// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Zap, History } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Brain size={80} color="white" strokeWidth={1.5} />
          </div>
          <h1>Detector de Emociones</h1>
          <p>
            Descubre lo que dicen los rostros en segundos. Sube una foto y deja que nuestra IA analice cada detalle emocional.
          </p>
          
          <div className="button-group" style={{ justifyContent: 'center', marginTop: '30px' }}>
            <Link to="/register" className="btn btn-white" style={{ background: 'white', color: '#667eea' }}>
              Comenzar ahora
            </Link>
            <Link to="/login" className="btn" style={{ border: '2px solid white', color: 'white' }}>
              Iniciar sesión
            </Link>
          </div>
        </div>
        
        <div className="face-grid" style={{ maxWidth: '1000px', margin: '60px auto 0' }}>
          <div className="card" style={{ padding: '30px', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
              <Target size={40} />
            </div>
            <h3 style={{ marginBottom: '10px' }}>Detección precisa</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Tecnología de vanguardia para identificar hasta 8 emociones distintas.</p>
          </div>
          <div className="card" style={{ padding: '30px', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
              <Zap size={40} />
            </div>
            <h3 style={{ marginBottom: '10px' }}>Resultados rápidos</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Análisis instantáneo para que no pierdas ni un segundo.</p>
          </div>
          <div className="card" style={{ padding: '30px', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
              <History size={40} />
            </div>
            <h3 style={{ marginBottom: '10px' }}>Historial personal</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Accede a tus análisis previos en cualquier momento y lugar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
