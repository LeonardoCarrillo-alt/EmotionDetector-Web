import React, { useState } from 'react';
import { analyzeImage } from '../../services/analysisService';

export const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const extractEmotion = (response: any): string => {
    if (typeof response?.emotion === 'string') return response.emotion;
    if (typeof response?.dominantEmotion === 'string') return response.dominantEmotion;
    if (Array.isArray(response?.faces) && response.faces[0]?.emotions?.length) {
      const topEmotion = response.faces[0].emotions.reduce((best: any, current: any) =>
        (current.confidence || 0) > (best.confidence || 0) ? current : best
      );
      return topEmotion?.type || 'No definida';
    }
    return 'No se pudo determinar';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setMessage('');
    setEmotion('');
    console.log('[ImageUploader] file selected', selectedFile?.name);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Selecciona una imagen primero');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await analyzeImage(file);
      const detectedEmotion = extractEmotion(response);
      setEmotion(detectedEmotion);
      setMessage(response?.message || 'Imagen analizada correctamente');
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
      {message && <p style={{ color: 'green' }}>Mensaje: {message}</p>}
      {emotion && <p>Emoción detectada: <strong>{emotion}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
