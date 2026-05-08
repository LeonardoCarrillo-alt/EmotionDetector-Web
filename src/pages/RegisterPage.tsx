import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import loginImage from '../assets/login-bg.png';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }
    setLoading(true);

    const success = await register(formData.username, formData.password);

    if (success) {
      setMessage('Registro exitoso');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="auth-split-container">
      <div
        className="auth-image-side"
        style={{ backgroundImage: `url(${loginImage})` }}
      />

      <div className="auth-form-side">
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px', boxShadow: 'none' }}>
          <div className="header" style={{ paddingTop: 0 }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Registrarse</h2>
            <p style={{ fontSize: '0.9rem' }}>Crea una cuenta para guardar tus analisis</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ background: '#fff5f5', color: '#e74c3c', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #fed7d7' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Usuario</label>
              <input
                type="text"
                name="username"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="tu_usuario"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Contrasena</label>
              <input
                type="password"
                name="password"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Confirmar contrasena</label>
              <input
                type="password"
                name="confirmPassword"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>

            <button type="submit" className="btn btn-gradient" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </button>
          </form>

          {message && <p style={{ color: 'green', marginTop: '12px' }}>{message}</p>}

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
              Inicia sesion aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
