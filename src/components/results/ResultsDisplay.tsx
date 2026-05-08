import React from 'react';
import { FaceCard } from './FaceCard';
import type { AnalysisResult } from '../../types';
import { Target, Calendar } from 'lucide-react';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { totalFaces, faces, createdAt } = results;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="results-container">
      <div style={{ marginBottom: '30px', background: '#f8f9ff', padding: '20px', borderRadius: '12px', border: '1px solid #eef0ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '8px' }}>
          <Target size={20} />
          <strong style={{ fontSize: '1.1rem' }}>Total de rostros detectados: {totalFaces}</strong>
        </div>
        {createdAt && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
            <Calendar size={14} />
            <span>Fecha del análisis: {formatDate(createdAt)}</span>
          </div>
        )}
      </div>

      {totalFaces === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '12px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No se detectaron rostros en esta imagen.</p>
        </div>
      ) : (
        <div className="face-grid">
          {faces.map((face, index) => (
            <FaceCard key={index} face={face} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
