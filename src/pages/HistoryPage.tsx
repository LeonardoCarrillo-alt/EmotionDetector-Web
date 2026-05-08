import React, { useEffect, useState } from 'react';
import type { HistoryItem } from '../types';
import { History as HistoryIcon, Users, Trash2, Smile, Heart, Frown, AlertCircle, HelpCircle, Eye, Zap } from 'lucide-react';

const emotionConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  HAPPY:     { icon: <Smile size={16} />,        color: '#FFD700', bgColor: '#FFF9E6' },
  CALM:      { icon: <Heart size={16} />,        color: '#4CAF50', bgColor: '#E8F5E9' },
  ANGRY:     { icon: <AlertCircle size={16} />,  color: '#FF6B6B', bgColor: '#FFEBEE' },
  SAD:       { icon: <Frown size={16} />,        color: '#2196F3', bgColor: '#E3F2FD' },
  CONFUSED:  { icon: <HelpCircle size={16} />,   color: '#9C27B0', bgColor: '#F3E5F5' },
  DISGUSTED: { icon: <Zap size={16} />,          color: '#FF9800', bgColor: '#FFF3E0' },
  SURPRISED: { icon: <Eye size={16} />,          color: '#E91E63', bgColor: '#FCE4EC' },
  FEAR:      { icon: <AlertCircle size={16} />,  color: '#8B0000', bgColor: '#FFEBEE' },
};

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('emotion_detector_token');

      const response = await fetch(
        'https://ao8lb9a0o2.execute-api.us-east-1.amazonaws.com/dev/history',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log('history data', data);

      setHistory(data.history || []);
    } catch (error) {
      console.error('Error loading history', error);
    }
  };

  fetchHistory();
}, []);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este análisis del historial?')) {
      setHistory(history.filter(item => item.id !== id));
    }
  };



  return (
    <div className="container">
      <div className="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HistoryIcon size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h1>Historial de Análisis</h1>
        <p>Tus últimas imágenes analizadas</p>
      </div>

      {history.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>No tienes análisis guardados aún.</p>
          <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '10px' }}>
            Sube una imagen en el panel principal para comenzar.
          </p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item) => (
            <div
              key={item.id}
              className="history-card"
            >
              <img
                src={item.imageUrl}
                alt="Thumbnail"
                className="history-thumbnail"
              />
              <div className="history-info">
                <h3 style={{ fontSize: '1.1rem' }}>Análisis del {formatDate(item.createdAt)}</h3>
                <div className="history-stats">
                  <div className="stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} />
                    {item.totalFaces} rostro(s)
                  </div>
                  <div className="stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: emotionConfig[item.dominantEmotion || '']?.color }}>
                      {emotionConfig[item.dominantEmotion || '']?.icon}
                    </span>
                    Emoción principal: <strong>{item.dominantEmotion || 'SIN DETECTAR'}</strong>
                  </div>
                </div>

                {/* Emociones por cara */}
                {item.faces?.map((face, faceIdx) => (
                  <div key={faceIdx} style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
                    <p style={{ margin: '0 0 0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Cara {face.faceIndex + 1}</p>

                    {face.gender && (
                      <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem' }}>
                        <strong>Género:</strong> {face.gender}
                      </p>
                    )}
                    {face.ageRange && (
                      <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem' }}>
                        <strong>Edad estimada:</strong> {face.ageRange.Low} - {face.ageRange.High} años
                      </p>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {face.emotions.map((emotion, emoIdx) => {
                        const config = emotionConfig[emotion.Type] || { icon: null, color: '#666', bgColor: '#f0f0f0' };
                        return (
                          <div
                            key={emoIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.5rem 0.75rem',
                              backgroundColor: config.bgColor,
                              borderRadius: '6px',
                              border: `1px solid ${config.color}40`,
                              gap: '0.5rem'
                            }}
                          >
                            <span style={{ color: config.color, display: 'flex' }}>{config.icon}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500', minWidth: '90px' }}>{emotion.Type}</span>
                            <div style={{ flex: 1, height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div
                                style={{
                                  height: '100%',
                                  width: `${emotion.Confidence}%`,
                                  backgroundColor: config.color,
                                  transition: 'width 0.3s ease'
                                }}
                              />
                            </div>
                            <span style={{ fontSize: '0.85rem', minWidth: '52px', textAlign: 'right', fontWeight: '500' }}>
                              {emotion.Confidence.toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="btn-delete"
                title="Eliminar"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
