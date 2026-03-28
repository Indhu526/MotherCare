import React from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    appName: 'MommyCare',
    tagline: 'Your trusted companion\nthrough every step of motherhood',
    sub: 'Prenatal care & support for Tamil Nadu mothers',
    getStarted: 'Get Started',
    langBtn: '🌐 தமிழ்',
    badge: '🌸 Govt. Supported Program',
  },
  ta: {
    appName: 'MommyCare',
    tagline: 'தாய்மையின் ஒவ்வொரு கட்டத்திலும்\nஉங்கள் நம்பகமான தோழி',
    sub: 'தமிழ்நாடு தாய்மார்களுக்கான கர்ப்பகால பராமரிப்பு',
    getStarted: 'தொடங்குவோம்',
    langBtn: '🌐 English',
    badge: '🌸 அரசு ஆதரவு திட்டம்',
  },
};

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  onNext: () => void;
}

export default function SplashScreen({ lang, setLang, onNext }: Props) {
  const t = tx[lang] ?? tx.en;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#fef6f9', position: 'relative', overflow: 'hidden' }}>
      {/* Top lang toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 1.25rem 0' }}>
        <button
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.9rem', borderRadius: '2rem', border: '1.5px solid #c2185b', background: '#fce4ec', color: '#c2185b', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
        >
          {t.langBtn}
        </button>
      </div>

      {/* App name */}
      <div style={{ textAlign: 'center', padding: '1.25rem 1.5rem 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🤱</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg, #b91c1c, #e91e63)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>{t.appName}</h1>
        </div>
        <div style={{ display: 'inline-block', background: '#fce4ec', color: '#c2185b', borderRadius: '2rem', padding: '0.25rem 0.8rem', fontSize: '0.78rem', fontWeight: 600 }}>{t.badge}</div>
      </div>

      {/* Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0 0' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
          {/* Decorative circle behind */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(252,228,236,0.9) 0%, rgba(255,246,249,0.4) 70%)', zIndex: 0 }} />
          <img
            src="/pregnant-woman.png"
            alt="Pregnant woman"
            style={{ position: 'relative', zIndex: 1, width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>

      {/* Bottom card */}
      <div style={{ background: 'white', borderRadius: '2rem 2rem 0 0', padding: '1.75rem 1.5rem 2rem', boxShadow: '0 -8px 32px rgba(194,24,91,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 0.5rem', lineHeight: 1.4, whiteSpace: 'pre-line', textAlign: 'center' }}>
          {t.tagline}
        </h2>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#888', textAlign: 'center', lineHeight: 1.5 }}>{t.sub}</p>

        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#e91e63' }} />
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#fce4ec' }} />
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#fce4ec' }} />
        </div>

        <button
          onClick={onNext}
          style={{ width: '100%', padding: '1rem', borderRadius: '0.85rem', border: 'none', background: 'linear-gradient(135deg, #b91c1c, #e91e63)', color: 'white', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.02em', boxShadow: '0 6px 20px rgba(185,28,28,0.35)' }}
        >
          {t.getStarted} →
        </button>
      </div>
    </div>
  );
}
