import React from 'react';
import { ImageUploader } from '../components/upload/ImageUploader';
import { Camera } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div className="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Camera size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h1>Detector de Emociones</h1>
        <p>Sube una foto y descubre las emociones de los rostros detectados</p>
      </div>
      
      <div className="card">
        <ImageUploader />
      </div>
    </div>
  );
};
