import React, { useState, useEffect } from 'react';
import { speak } from '../utils/speak';

const translations = {
  en: {
    greeting: 'Good morning',
    name: 'Meena',
    subtitle: 'Week 14 · Second Trimester',
    tip: "🌟 Today's Tip",
    tipText: 'Drink at least 8 glasses of water and eat iron-rich foods like lentils and spinach today.',
    vitals: 'Quick Check-in',
    feelingGood: 'Feeling Good',
    feelingOk: 'Feeling Okay',
    feelingPoor: 'Need Help',
    weekProg: 'Pregnancy Progress',
    week: 'Week',
    of: 'of',
    weeks: 'weeks',
    nextVisit: 'Next Visit',
    visitDate: 'May 2, 2025 — Iron test & checkup',
    emergencyBtn: 'SOS Emergency',
    sos: 'SOS',
    sosMsg: 'Calling emergency services...',
    feelingMsg: 'We noted how you are feeling. Stay healthy!',
    babySize: "Baby's size this week",
    babySizeDesc: 'Your baby is now the size of a lemon 🍋',
  },
  ta: {
    greeting: 'காலை வணக்கம்',
    name: 'மீனா',
    subtitle: 'வாரம் 14 · இரண்டாம் திமஸ்டர்',
    tip: '🌟 இன்றைய குறிப்பு',
    tipText: 'குறைந்தது 8 கிளாஸ் தண்ணீர் குடிக்கவும், பருப்பு மற்றும் கீரை போன்ற இரும்புச்சத்து நிறைந்த உணவை சாப்பிடவும்.',
    vitals: 'விரைவு சரிபார்ப்பு',
    feelingGood: 'நலமாக உள்ளேன்',
    feelingOk: 'சரியாக உள்ளேன்',
    feelingPoor: 'உதவி தேவை',
    weekProg: 'கர்ப்பகால முன்னேற்றம்',
    week: 'வாரம்',
    of: 'இல்',
    weeks: 'வாரங்கள்',
    nextVisit: 'அடுத்த வருகை',
    visitDate: 'மே 2, 2025 — இரும்பு பரிசோதனை & ஆய்வு',
    emergencyBtn: 'SOS அவசரம்',
    sos: 'SOS',
    sosMsg: 'அவசர சேவைகளை அழைக்கிறோம்...',
    feelingMsg: 'நீங்கள் எப்படி உணர்கிறீர்கள் என்று குறித்துக்கொண்டோம். ஆரோக்கியமாக இருங்கள்!',
    babySize: 'இந்த வாரம் குழந்தையின் அளவு',
    babySizeDesc: 'உங்கள் குழந்தை இப்போது ஒரு எலுமிச்சை அளவு உள்ளது 🍋',
  },
};

interface Props {
  language: string;
}

export default function HomeScreen({ language }: Props) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [feeling, setFeeling] = useState<string | null>(null);
  const [showSos, setShowSos] = useState(false);

  const week = 14;
  const totalWeeks = 40;
  const progress = Math.round((week / totalWeeks) * 100);

  const handleFeeling = (f: string) => {
    setFeeling(f);
    speak(t.feelingMsg, language);
  };

  const handleSos = () => {
    setShowSos(true);
    speak(t.sosMsg, language);
    setTimeout(() => setShowSos(false), 3000);
  };

  return (
    <div className="fadeIn">
      {/* Header greeting */}
      <div className="card" style={{ background: 'linear-gradient(135deg, hsl(336,72%,45%) 0%, hsl(336,72%,55%) 100%)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85 }}>{t.greeting},</p>
            <h2 style={{ margin: '0.2rem 0 0.3rem', fontSize: '1.5rem', fontWeight: 700 }}>{t.name} 👋</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.85 }}>{t.subtitle}</p>
          </div>
          <button className="sos-btn" onClick={handleSos}>{t.sos}</button>
        </div>
        {showSos && (
          <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.5rem', padding: '0.6rem 0.8rem', fontSize: '0.9rem' }}>
            🆘 {t.sosMsg}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="card">
        <h3 style={{ margin: '0 0 0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.weekProg}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.1rem' }}>{t.week} {week}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{week} {t.of} {totalWeeks} {t.weeks}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.babySizeDesc}</p>
      </div>

      {/* Today's tip */}
      <div className="card" style={{ borderLeft: '4px solid hsl(336,72%,45%)' }}>
        <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{t.tip}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>{t.tipText}</p>
      </div>

      {/* Feeling check */}
      <div className="card">
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t.vitals}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['feelingGood', 'feelingOk', 'feelingPoor'] as const).map((key, i) => (
            <button
              key={key}
              onClick={() => handleFeeling(key)}
              style={{
                flex: 1,
                padding: '0.7rem 0.4rem',
                borderRadius: '0.75rem',
                border: `2px solid ${feeling === key ? (i === 0 ? '#4CAF50' : i === 1 ? '#FF9800' : '#f44336') : 'hsl(340,20%,88%)'}`,
                background: feeling === key ? (i === 0 ? '#E8F5E9' : i === 1 ? '#FFF3E0' : '#FFEBEE') : 'white',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: i === 0 ? '#2E7D32' : i === 1 ? '#E65100' : '#c62828',
                transition: 'all 0.15s',
              }}
            >
              {i === 0 ? '😊' : i === 1 ? '😐' : '😟'}<br />
              <span style={{ fontSize: '0.72rem' }}>{t[key]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next visit */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'hsl(336,72%,92%)', borderRadius: '0.75rem', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>📅</div>
        <div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.nextVisit}</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 600 }}>{t.visitDate}</p>
        </div>
      </div>
    </div>
  );
}
