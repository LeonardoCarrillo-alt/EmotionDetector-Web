import api from './api'
import { compressImage } from '../utils/imageCompression'

export const analyzeImage = async (imageFile) => {
  try {
    // Validar tamaño
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (imageFile.size > maxSize) {
      throw new Error(`La imagen excede el límite de 5MB`)
    }
    
    // Validar tipo
    if (!['image/jpeg', 'image/png'].includes(imageFile.type)) {
      throw new Error('Solo se permiten archivos JPG o PNG')
    }
    
    // Comprimir imagen si es necesario
    let finalFile = imageFile
    if (imageFile.size > 2 * 1024 * 1024) { // Si es >2MB, comprimir
      finalFile = await compressImage(imageFile, 1024, 0.8)
    }
    
    // Convertir a base64
    const base64 = await fileToBase64(finalFile)
    
    // Enviar a API
    const response = await api.post('/analyze', {
      image: base64
    })
    
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Error al analizar la imagen')
  }
}

// Helper: convertir File a base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// Helper: obtener historial
export const getHistory = async () => {
  try {
    const response = await api.get('/history')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener historial')
  }
}

// Helper: eliminar análisis
export const deleteAnalysis = async (analysisId) => {
  try {
    const response = await api.delete(`/analysis/${analysisId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al eliminar análisis')
  }
}

// Helper: obtener detalles de un análisis
export const getAnalysisDetails = async (analysisId) => {
  try {
    const response = await api.get(`/analysis/${analysisId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener detalles')
  }
}