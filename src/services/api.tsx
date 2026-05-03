import axios from 'axios'

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/dev',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Interceptor para agregar token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('emotion_detector_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('emotion_detector_token')
      localStorage.removeItem('emotion_detector_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api