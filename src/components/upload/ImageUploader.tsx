import React, { useState } from 'react';
import { analyzeImage } from '../../services/analysisService';
import { 
  Smile, 
  Heart, 
  Frown, 
  AlertCircle, 
  HelpCircle, 
  Eye,
  Zap
} from 'lucide-react';

interface FaceAnalysis {
  faceIndex: number;
  emotions: Array<{ Type: string; Confidence: number }>;
  ageRange?: { Low: number; High: number };
  gender?: string;
}

interface AnalysisResponse {
  success: boolean;
  analysisId: string;
  totalFaces: number;
  dominantEmotion: string;
  faces: FaceAnalysis[];
  imageUrl: string;
  createdAt: string;
}

const emotionConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  HAPPY: { icon: <Smile size={18} />, color: '#FFD700', bgColor: '#FFF9E6' },
  CALM: { icon: <Heart size={18} />, color: '#4CAF50', bgColor: '#E8F5E9' },
  ANGRY: { icon: <AlertCircle size={18} />, color: '#FF6B6B', bgColor: '#FFEBEE' },
  SAD: { icon: <Frown size={18} />, color: '#2196F3', bgColor: '#E3F2FD' },
  CONFUSED: { icon: <HelpCircle size={18} />, color: '#9C27B0', bgColor: '#F3E5F5' },
  DISGUSTED: { icon: <Zap size={18} />, color: '#FF9800', bgColor: '#FFF3E0' },
  SURPRISED: { icon: <Eye size={18} />, color: '#E91E63', bgColor: '#FCE4EC' },
  FEAR: { icon: <AlertCircle size={18} />, color: '#8B0000', bgColor: '#FFEBEE' }
};

export const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractEmotion = (response: any): string => {
    if (typeof response?.emotion === 'string') return response.emotion;
    if (typeof response?.dominantEmotion === 'string') return response.dominantEmotion;
    if (Array.isArray(response?.faces) && response.faces[0]?.emotions?.length) {
      const topEmotion = response.faces[0].emotions.reduce((best: any, current: any) =>
        (current.Confidence || current.confidence || 0) > (best.Confidence || best.confidence || 0) ? current : best
      );
      return topEmotion?.Type || topEmotion?.type || 'No definida';
    }
    return 'No se pudo determinar';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setAnalysisData(null);
    
    // Create preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
    console.log('[ImageUploader] file selected', selectedFile?.name);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Selecciona una imagen primero');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const response = await analyzeImage(file);
      setAnalysisData(response as AnalysisResponse);
      console.log('[ImageUploader] analyze success', response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al analizar';
      setError(errorMessage);
      console.error('[ImageUploader] analyze error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleAnalyze} className="btn btn-primary" disabled={loading}>
        {loading ? 'Analizando...' : 'Analyze'}
      </button>
      
      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <img 
            src={preview} 
            alt="preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px',
              borderRadius: '8px',
              objectFit: 'contain'
            }} 
          />
        </div>
      )}

      {analysisData && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ marginTop: 0 }}>Resultados del Análisis</h3>
          
          {/* Caras detectadas */}
          <p style={{ fontSize: '0.95rem', color: '#666' }}>
            <strong>Caras detectadas:</strong> {analysisData.totalFaces}
          </p>

          {/* Información por cara */}
          {analysisData.faces.map((face, idx) => (
            <div key={idx} style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
              <h4 style={{ marginTop: 0 }}>Cara {face.faceIndex + 1}</h4>

              {face.gender && (
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Género:</strong> {face.gender}
                </p>
              )}

              {face.ageRange && (
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Edad estimada:</strong> {face.ageRange.Low} - {face.ageRange.High} años
                </p>
              )}

              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Emoción dominante:</strong>{' '}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: emotionConfig[analysisData.dominantEmotion]?.color }}>
                    {emotionConfig[analysisData.dominantEmotion]?.icon}
                  </span>
                  {analysisData.dominantEmotion}
                </span>
              </p>

              {/* Emociones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {face.emotions.map((emotion, emoIdx) => {
                  const config = emotionConfig[emotion.Type] || { icon: null, color: '#666', bgColor: '#f0f0f0' };
                  return (
                    <div
                      key={emoIdx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        backgroundColor: config.bgColor,
                        borderRadius: '6px',
                        border: `1px solid ${config.color}40`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                        <span style={{ color: config.color, display: 'flex' }}>{config.icon}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{emotion.Type}</span>
                      </div>
                      <div style={{ flex: 1, height: '20px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginLeft: '1rem' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${emotion.Confidence}%`,
                            backgroundColor: config.color,
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                      <span style={{ textAlign: 'right', marginLeft: '0.5rem', fontSize: '0.9rem', minWidth: '60px', fontWeight: '500' }}>
                        {emotion.Confidence.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};
