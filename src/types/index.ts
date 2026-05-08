// Tipos para el usuario
export interface User {
  id: string;
  username: string;
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
export interface HistoryFaceEmotion {
  Type: string;
  Confidence: number;
}

export interface HistoryFace {
  faceIndex: number;
  emotions: HistoryFaceEmotion[];
  ageRange?: { Low: number; High: number };
  gender?: string;
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  totalFaces: number;
  dominantEmotion: string | null;
  createdAt: string;
  faces?: HistoryFace[];
}

// Tipos para contexto de autenticación
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setError: (error: string | null) => void;
}