import React from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    appName: 'MotherCare',
    appPlus: '+',
    tagline: 'Your trusted companion\nthrough every step of motherhood',
    sub: 'Prenatal care & support for Tamil Nadu mothers',
    getStarted: 'Get Started',
    langBtn: '🌐 தமிழ்',
    badge: 'Govt. Supported Programme',
  },
  ta: {
    appName: 'MotherCare',
    appPlus: '+',
    tagline: 'தாய்மையின் ஒவ்வொரு கட்டத்திலும்\nஉங்கள் நம்பகமான தோழி',
    sub: 'தமிழ்நாடு தாய்மார்களுக்கான கர்ப்பகால பராமரிப்பு',
    getStarted: 'தொடங்குவோம்',
    langBtn: '🌐 English',
    badge: 'அரசு ஆதரவு திட்டம்',
  },
};

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  onNext: () => void;
}

function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="#b91c1c" strokeWidth="1.5" fill="white" />
      <circle cx="26" cy="26" r="20" fill="url(#lgGrad)" />
      <line x1="26" y1="14" x2="26" y2="38" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="14" y1="26" x2="38" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="lgGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="1" stopColor="#e91e63" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function SplashScreen({ lang, setLang, onNext }: Props) {
  const t = tx[lang] ?? tx.en;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      {/* Top lang toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 1.25rem 0' }}>
        <button
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.9rem', borderRadius: '2rem', border: '1px solid #d0d0d0', background: 'white', color: '#555', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em' }}
        >
          {t.langBtn}
        </button>
      </div>

      {/* App name */}
      <div style={{ textAlign: 'center', padding: '1rem 1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <LogoMark size={44} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1a1a1a', margin: 0, letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>
              {t.appName}
            </h1>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#b91c1c', lineHeight: 1, marginLeft: '0.05rem' }}>{t.appPlus}</span>
          </div>
        </div>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', borderTop: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8', padding: '0.25rem 0.85rem', fontSize: '0.7rem', fontWeight: 600, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#b91c1c"><path d="M5 0l1.5 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h3.5z"/></svg>
          {t.badge}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#b91c1c"><path d="M5 0l1.5 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h3.5z"/></svg>
        </div>
      </div>

      {/* Decorative thin line */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem 0 0' }}>
        <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, #b91c1c, transparent)' }} />
      </div>

      {/* Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 0' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 300 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,28,28,0.07) 0%, transparent 70%)', zIndex: 0 }} />
          <img src="/pregnant-woman.png" alt="Pregnant woman" style={{ position: 'relative', zIndex: 1, width: '100%', maxHeight: 290, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
        </div>
      </div>

      {/* Bottom card */}
      <div style={{ background: 'white', borderRadius: '2rem 2rem 0 0', padding: '1.5rem 1.5rem 1.75rem', boxShadow: '0 -6px 24px rgba(0,0,0,0.07)', borderTop: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 0.4rem', lineHeight: 1.45, whiteSpace: 'pre-line', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
          {t.tagline}
        </h2>
        <p style={{ margin: '0 0 1.25rem', fontSize: '0.78rem', color: '#999', textAlign: 'center', lineHeight: 1.5, letterSpacing: '0.01em' }}>{t.sub}</p>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 24, height: 6, borderRadius: 3, background: '#b91c1c' }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: '#e0e0e0' }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: '#e0e0e0' }} />
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '0.95rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #b91c1c, #c2185b)', color: 'white', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 6px 18px rgba(185,28,28,0.3)' }}>
          {t.getStarted} →
        </button>
      </div>
    </div>
  );
}
