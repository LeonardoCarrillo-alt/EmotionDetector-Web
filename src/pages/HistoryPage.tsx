import React, { useState } from 'react';
import { mockHistory } from '../mocks/mockData';
import { emotionIcons } from '../mocks/mockData';
import type { HistoryItem } from '../types';
import { History as HistoryIcon, Users, Trash2, ArrowRight } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este análisis del historial?')) {
      setHistory(history.filter(item => item.id !== id));
    }
  };

  const getEmotionIcon = (emotion: string) => {
    return emotionIcons[emotion] || '😐';
  };

  const getEmotionClass = (emotion: string) => {
    return emotion === 'FELIZ' ? 'tag happy' : 'tag';
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
                src={item.thumbnail}
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
                    Principal: {item.dominantEmotion}
                  </div>
                </div>
                <div className="emotion-tags">
                  <span className={getEmotionClass(item.dominantEmotion)}>
                    {getEmotionIcon(item.dominantEmotion)} {item.dominantEmotion}
                  </span>
                  <span className="tag" style={{ cursor: 'pointer', fontWeight: 'bold', color: '#667eea', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Ver detalles <ArrowRight size={14} />
                  </span>
                </div>
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
