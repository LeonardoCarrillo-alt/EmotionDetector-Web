import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Brain, History, LayoutDashboard, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Brain size={28} color="var(--primary)" />
        <h2 style={{ margin: 0 }}>EmotionDetector</h2>
      </Link>
      
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LayoutDashboard size={18} />
              Analizar
            </Link>
            <Link 
              to="/history" 
              className={location.pathname === '/history' ? 'active' : ''}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <History size={18} />
              Historial
            </Link>
            <span style={{ fontSize: '0.9rem', color: '#666', background: '#f0f0f0', padding: '4px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} />
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn"
              style={{ padding: '6px 15px', fontSize: '0.8rem', color: '#e74c3c', background: 'transparent', border: '1px solid #e74c3c', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="btn btn-gradient"
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
