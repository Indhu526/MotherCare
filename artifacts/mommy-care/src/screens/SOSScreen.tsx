import React, { useState } from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    title: 'Emergency',
    subtitle: 'Tap the button if you are experiencing severe pain, bleeding, or other danger signs.',
    calling: '🚨 Calling emergency services...',
    sos: 'SOS',
  },
  ta: {
    title: 'அவசரநிலை',
    subtitle: 'கடுமையான வலி, இரத்தப்போக்கு அல்லது ஆபத்தான அறிகுறிகள் இருந்தால் தட்டவும்.',
    calling: '🚨 அவசர சேவைகளை அழைக்கிறோம்...',
    sos: 'SOS',
  },
};

interface Props { lang: Lang; }

export default function SOSScreen({ lang }: Props) {
  const t = tx[lang] ?? tx.en;
  const [pressed, setPressed] = useState(false);

  const handleSOS = () => {
    setPressed(true);
    const a = document.createElement('a');
    a.href = 'tel:108';
    a.click();
    setTimeout(() => setPressed(false), 4000);
  };

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f5f0e8', padding: '1.5rem 1.5rem', textAlign: 'center', gap: '1rem', overflow: 'hidden' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#7f1d1d', margin: 0 }}>{t.title}</h1>
      <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.55, maxWidth: 260, margin: 0 }}>{t.subtitle}</p>

      {/* SOS Button */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,99,0.18) 0%, rgba(233,30,99,0.04) 70%, transparent 100%)' }} />
        <button onClick={handleSOS} style={{ width: 170, height: 170, borderRadius: '50%', background: pressed ? 'radial-gradient(circle at 40% 35%, #ef5350, #b71c1c)' : 'radial-gradient(circle at 40% 35%, #e53935, #b71c1c)', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', boxShadow: pressed ? '0 0 0 8px rgba(233,30,99,0.2), 0 8px 32px rgba(183,28,28,0.5)' : '0 8px 32px rgba(183,28,28,0.4)', transform: pressed ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.15s ease' }}>
          <svg width="60" height="56" viewBox="0 0 70 65" fill="none">
            <path d="M35 8L63 58H7L35 8Z" stroke="white" strokeWidth="4.5" strokeLinejoin="round" fill="none"/>
            <line x1="35" y1="28" x2="35" y2="44" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
            <circle cx="35" cy="51" r="3" fill="white"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '0.15em' }}>{t.sos}</span>
        </button>
      </div>

      {pressed && (
        <div className="fadeIn" style={{ background: '#fee2e2', border: '2px solid #b91c1c', borderRadius: '0.75rem', padding: '0.65rem 1rem', color: '#7f1d1d', fontWeight: 700, fontSize: '0.88rem' }}>
          {t.calling}
        </div>
      )}
    </div>
  );
}
