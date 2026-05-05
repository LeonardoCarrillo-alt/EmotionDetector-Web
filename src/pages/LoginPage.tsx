import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(formData.username, formData.password);

    if (success) {
      setMessage('Login exitoso');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '40px' }}>
      <div className="card" style={{ padding: '24px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Login'}
          </button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '12px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
        <p style={{ marginTop: '16px' }}>
          ¿No tienes cuenta? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
