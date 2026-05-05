import React, { createContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import type { ReactNode } from 'react';
import { login as loginRequest, register as registerRequest } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('emotion_detector_user');
    const storedToken = localStorage.getItem('emotion_detector_token');
    console.log('[auth] restoring session', { hasUser: !!storedUser, hasToken: !!storedToken });

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await loginRequest(username, password);
      const savedToken = response.token || localStorage.getItem('emotion_detector_token');
      const authUser: User = {
        id: response.user?.id || Date.now().toString(),
        username: response.user?.username || username,
        createdAt: response.user?.createdAt || new Date().toISOString()
      };

      localStorage.setItem('emotion_detector_user', JSON.stringify(authUser));
      if (savedToken) {
        localStorage.setItem('emotion_detector_token', savedToken);
      }

      setUser(authUser);
      setToken(savedToken || null);
      console.log('[auth] login success', { username: authUser.username });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Credenciales inválidas';
      setError(message);
      console.error('[auth] login error', err);
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await registerRequest(username, password);
      console.log('[auth] register success', response);
      return await login(username, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error en el registro';
      setError(message);
      console.error('[auth] register error', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('emotion_detector_user');
    localStorage.removeItem('emotion_detector_token');
    setUser(null);
    setToken(null);
    console.log('[auth] session closed');
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