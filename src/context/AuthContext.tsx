import React, { createContext, useState, useEffect} from 'react';
import type { User, AuthContextType } from '../types';
import type { ReactNode } from 'react';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuario para demo
const MOCK_USER: User = {
  id: '1',
  email: 'demo@emotiondetector.com',
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga de sesión
    const storedUser = localStorage.getItem('demo_user');
    const storedToken = localStorage.getItem('demo_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    // Simular validación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password.length >= 3) {
      const demoUser = { ...MOCK_USER, email };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      localStorage.setItem('demo_token', 'mock_jwt_token_demo');
      setUser(demoUser);
      setToken('mock_jwt_token_demo');
      return true;
    }
    
    setError('Credenciales inválidas para la demo');
    return false;
  };

  const register = async (email: string, password: string, confirmPassword: string): Promise<boolean> => {
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!email.includes('@')) {
      setError('Email inválido');
      return false;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    const newUser = { ...MOCK_USER, email, id: Date.now().toString() };
    localStorage.setItem('demo_user', JSON.stringify(newUser));
    localStorage.setItem('demo_token', 'mock_jwt_token_demo');
    setUser(newUser);
    setToken('mock_jwt_token_demo');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};