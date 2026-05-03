import api from './api'

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      email: userData.email,
      password: userData.password
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro')
  }
}

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el login')
  }
}

export const logout = () => {
  // Solo limpiamos el frontend, no hay endpoint de logout
  localStorage.removeItem('emotion_detector_token')
  localStorage.removeItem('emotion_detector_user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('emotion_detector_user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('emotion_detector_token')
}