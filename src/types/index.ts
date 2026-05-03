// Tipos para el usuario
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

// Tipos para emociones
export interface Emotion {
  type: string;
  confidence: number;
}

// Tipos para rostro detectado
export interface Face {
  emotions: Emotion[];
  ageRange: {
    low: number;
    high: number;
  };
  gender: string;
  confidence: number;
}

// Tipos para resultado de análisis
export interface AnalysisResult {
  totalFaces: number;
  faces: Face[];
  s3Key?: string;
  createdAt?: string;
}

// Tipos para historial
export interface HistoryItem {
  id: string;
  thumbnail: string;
  totalFaces: number;
  dominantEmotion: string;
  createdAt: string;
}

// Tipos para contexto de autenticación
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => void;
  setError: (error: string | null) => void;
}