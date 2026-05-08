import React from 'react';
import type { Face } from '../../types';
import { User, Calendar, Smile, Frown, Meh, Annoyed, Ghost, AlertCircle } from 'lucide-react';

interface FaceCardProps {
  face: Face;
  index: number;
}

export const FaceCard: React.FC<FaceCardProps> = ({ face, index }) => {
  const sortedEmotions = [...face.emotions].sort((a, b) => b.confidence - a.confidence);

  const getEmotionIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'FELIZ': return <Smile size={18} />;
      case 'TRISTE': return <Frown size={18} />;
      case 'NEUTRAL': return <Meh size={18} />;
      case 'ENOJADO': return <Annoyed size={18} />;
      case 'SORPRESA': return <Ghost size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  return (
    <div className="face-card" style={{ transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
        <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {index + 1}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>Rostro Detectado</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
          <User size={16} color="#888" />
          <span>Género: {face.gender}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
          <Calendar size={16} color="#888" />
          <span>Edad: {face.ageRange.low}-{face.ageRange.high} años</span>
        </div>
      </div>
      
      <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', color: '#999' }}>Emociones</h4>
      
      {sortedEmotions.slice(0, 3).map((emotion, i) => (
        <div key={i} className="emotion-bar" style={{ marginBottom: '15px' }}>
          <div className="emotion-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
              {getEmotionIcon(emotion.type)}
              {emotion.type}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>{Math.round(emotion.confidence * 100)}%</span>
          </div>
          <div className="progress-bar" style={{ height: '6px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${emotion.confidence * 100}%`, height: '100%', background: 'var(--bg-gradient)', borderRadius: '10px' }}
            ></div>
          </div>
        </div>
      ))}
      
      <div className="confidence-badge" style={{ marginTop: '10px', background: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Sparkles size={14} />
        Confianza: {Math.round(sortedEmotions[0].confidence * 100)}%
      </div>
    </div>
  );
};

// Helper for the badge icon
const Sparkles = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);
