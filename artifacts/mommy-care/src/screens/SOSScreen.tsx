import React, { useState } from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    title: 'Emergency',
    subtitle: 'Tap the button below if you are experiencing severe pain, bleeding, or other danger signs.',
    calling: '🚨 Calling emergency services...',
    sos: 'SOS',
  },
  ta: {
    title: 'அவசரநிலை',
    subtitle: 'கடுமையான வலி, இரத்தப்போக்கு அல்லது ஆபத்தான அறிகுறிகள் இருந்தால் கீழே உள்ள பொத்தானை தட்டவும்.',
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
    // Actually trigger phone call to 108
    const a = document.createElement('a');
    a.href = 'tel:108';
    a.click();
    setTimeout(() => setPressed(false), 4000);
  };

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', background: '#f5f0e8', padding: '2rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#7f1d1d', margin: '0 0 1rem', letterSpacing: '0.01em' }}>{t.title}</h1>
      <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6, maxWidth: 280, margin: '0 0 3rem' }}>{t.subtitle}</p>

      {/* SOS button with ring */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer pink glow ring */}
        <div style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,99,0.18) 0%, rgba(233,30,99,0.05) 60%, transparent 80%)',
          animation: pressed ? 'pulse 1s infinite' : 'none',
        }} />

        <button
          onClick={handleSOS}
          style={{
            width: 190,
            height: 190,
            borderRadius: '50%',
            background: pressed
              ? 'radial-gradient(circle at 40% 35%, #ef5350, #b71c1c)'
              : 'radial-gradient(circle at 40% 35%, #e53935, #b71c1c)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            boxShadow: pressed
              ? '0 0 0 8px rgba(233,30,99,0.25), 0 8px 32px rgba(183,28,28,0.5)'
              : '0 8px 32px rgba(183,28,28,0.4)',
            transform: pressed ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.15s ease',
          }}
        >
          {/* Warning triangle */}
          <svg width="70" height="65" viewBox="0 0 70 65" fill="none">
            <path d="M35 8L63 58H7L35 8Z" stroke="white" strokeWidth="4.5" strokeLinejoin="round" fill="none"/>
            <line x1="35" y1="28" x2="35" y2="44" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
            <circle cx="35" cy="51" r="3" fill="white"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.15em' }}>{t.sos}</span>
        </button>
      </div>

      {pressed && (
        <div className="fadeIn" style={{ marginTop: '2rem', background: '#fee2e2', border: '2px solid #b91c1c', borderRadius: '0.75rem', padding: '0.85rem 1.25rem', color: '#7f1d1d', fontWeight: 700, fontSize: '0.95rem' }}>
          {t.calling}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
