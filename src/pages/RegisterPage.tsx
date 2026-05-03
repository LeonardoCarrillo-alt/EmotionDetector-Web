import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import loginImage from '../assets/login-bg.png';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await register(
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    
    if (success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="auth-split-container">
      <div 
        className="auth-image-side" 
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        {/* Lado de la imagen sin texto para que se aprecie mejor */}
      </div>

      <div className="auth-form-side">
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px', boxShadow: 'none' }}>
          <div className="header" style={{ paddingTop: 0 }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Registrarse</h2>
            <p style={{ fontSize: '0.9rem' }}>Crea una cuenta para guardar tus análisis</p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ background: '#fff5f5', color: '#e74c3c', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #fed7d7' }}>
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Correo electrónico</label>
              <input
                type="email"
                name="email"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Contraseña</label>
              <input
                type="password"
                name="password"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-gradient" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
