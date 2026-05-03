import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ResultsDisplay } from '../results/ResultsDisplay';
import { mockAnalysisResult } from '../../mocks/mockData';
import type { AnalysisResult } from '../../types';
import { Upload, Image as ImageIcon, Sparkles, AlertCircle, BarChart3, RefreshCw } from 'lucide-react';

export const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Solo se permiten archivos JPG o PNG');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5MB');
      return;
    }
    
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
    setResults(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 5 * 1024 * 1024
  });

  const handleAnalyze = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    // Simular análisis con delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Usar datos mock
    setResults(mockAnalysisResult);
    setLoading(false);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="uploader-container">
      {!preview && (
        <div
          {...getRootProps()}
          className={`upload-area ${isDragActive ? 'drag-over' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="upload-icon" style={{ color: 'var(--primary)', opacity: 0.8 }}>
            <Upload size={64} />
          </div>
          <h3>Arrastra o haz clic para subir una imagen</h3>
          <p>Formatos soportados: JPG, PNG (Máx. 5MB)</p>
          <button className="btn btn-gradient">
            Seleccionar imagen
          </button>
        </div>
      )}

      {preview && !results && (
        <div className="preview-area" style={{ display: 'block', padding: '30px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            className="preview-image" 
            style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto', display: 'block', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
          />
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff5f5', color: '#e74c3c', padding: '12px', borderRadius: '8px', marginTop: '20px', border: '1px solid #fed7d7' }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          <div className="button-group" style={{ marginTop: '20px', justifyContent: 'center' }}>
            <button onClick={handleReset} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} />
              Cambiar imagen
            </button>
            <button onClick={handleAnalyze} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} />
              {loading ? 'Analizando...' : 'Analizar emociones'}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay" style={{ flexDirection: 'column', gap: '20px' }}>
          <div className="spinner"></div>
          <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 500 }}>Procesando imagen...</p>
        </div>
      )}

      {results && (
        <div className="results-section" style={{ display: 'block' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <BarChart3 size={24} color="var(--primary)" />
              Resultados del Análisis
            </h2>
            <button onClick={handleReset} className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} />
              Nuevo análisis
            </button>
          </div>
          <ResultsDisplay results={results} />
        </div>
      )}
    </div>
  );
};
