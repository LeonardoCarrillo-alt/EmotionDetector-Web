import type { AnalysisResult, HistoryItem } from '../types';

// Mock de resultados de análisis
export const mockAnalysisResult: AnalysisResult = {
  totalFaces: 2,
  createdAt: new Date().toISOString(),
  faces: [
    {
      emotions: [
        { type: 'FELIZ', confidence: 0.95 },
        { type: 'SORPRESA', confidence: 0.78 },
        { type: 'NEUTRAL', confidence: 0.65 },
        { type: 'CALMA', confidence: 0.45 },
        { type: 'TRISTE', confidence: 0.12 }
      ],
      ageRange: { low: 25, high: 35 },
      gender: 'Femenino',
      confidence: 0.98
    },
    {
      emotions: [
        { type: 'NEUTRAL', confidence: 0.88 },
        { type: 'CALMA', confidence: 0.72 },
        { type: 'FELIZ', confidence: 0.60 },
        { type: 'SORPRESA', confidence: 0.30 },
        { type: 'TRISTE', confidence: 0.08 }
      ],
      ageRange: { low: 28, high: 38 },
      gender: 'Masculino',
      confidence: 0.95
    }
  ]
};

// Mock de historial de análisis
export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/id/20/200/150',
    totalFaces: 2,
    dominantEmotion: 'FELIZ',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/id/30/200/150',
    totalFaces: 1,
    dominantEmotion: 'NEUTRAL',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/id/40/200/150',
    totalFaces: 3,
    dominantEmotion: 'SORPRESA',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/id/26/200/150',
    totalFaces: 1,
    dominantEmotion: 'TRISTE',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Emojis por emoción
export const emotionIcons: Record<string, string> = {
  'FELIZ': '😊',
  'TRISTE': '😢',
  'ENOJADO': '😠',
  'SORPRESA': '😲',
  'NEUTRAL': '😐',
  'CALMA': '😌',
  'CONFUSO': '🤔',
  'DESAGRADABLE': '😖'
};

// Colores por emoción
export const emotionColors: Record<string, string> = {
  'FELIZ': '#10B981',
  'TRISTE': '#3B82F6',
  'ENOJADO': '#EF4444',
  'SORPRESA': '#F59E0B',
  'NEUTRAL': '#6B7280',
  'CALMA': '#8B5CF6'
};