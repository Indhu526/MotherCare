import React from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    welcome: 'Welcome to',
    appName: 'MotherCare+',
    sub: 'Supporting mothers through every step of their journey',
    register: 'Register',
    registerDesc: 'New user? Create your account',
    login: 'Already a User',
    loginDesc: 'Sign in to your account',
    back: '←',
    loginTitle: 'Welcome Back!',
    loginSub: 'Enter your details to continue',
    phoneLbl: 'Phone Number',
    phonePh: 'Enter your phone number',
    nameLbl: 'Your Name',
    namePh: 'Enter your registered name',
    signIn: 'Sign In',
    forgotHelp: 'Need help?',
    badges: ['✦ Govt. Certified', '✦ Secure & Private', '✦ Bilingual'],
  },
  ta: {
    welcome: 'வரவேற்கிறோம்',
    appName: 'MotherCare+',
    sub: 'உங்கள் தாய்மை பயணத்தில் ஒவ்வொரு படியிலும் ஆதரவு',
    register: 'பதிவு செய்',
    registerDesc: 'புதிய பயனரா? கணக்கை உருவாக்கவும்',
    login: 'ஏற்கனவே பயனர்',
    loginDesc: 'உங்கள் கணக்கில் உள்நுழைக',
    back: '←',
    loginTitle: 'மீண்டும் வரவேற்கிறோம்!',
    loginSub: 'தொடர உங்கள் விவரங்களை உள்ளிடவும்',
    phoneLbl: 'தொலைபேசி எண்',
    phonePh: 'தொலைபேசி எண்ணை உள்ளிடவும்',
    nameLbl: 'உங்கள் பெயர்',
    namePh: 'பதிவு செய்த பெயரை உள்ளிடவும்',
    signIn: 'உள்நுழை',
    forgotHelp: 'உதவி வேண்டுமா?',
    badges: ['✦ அரசு சான்று', '✦ பாதுகாப்பு', '✦ இருமொழி'],
  },
};

function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="#b91c1c" strokeWidth="1.5" fill="white" />
      <circle cx="26" cy="26" r="20" fill="url(#authGrad)" />
      <line x1="26" y1="14" x2="26" y2="38" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="14" y1="26" x2="38" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="authGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="1" stopColor="#c2185b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  onRegister: () => void;
  onLogin: () => void;
  onBack: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #e8e8e8', borderRadius: '0.65rem',
  fontSize: '0.92rem', outline: 'none', background: '#fafafa', color: '#1a1a1a', boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#777', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase',
};

export default function AuthScreen({ lang, setLang, onRegister, onLogin, onBack }: Props) {
  const t = tx[lang] ?? tx.en;
  const [showLogin, setShowLogin] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');

  // ── Login sub-screen ──────────────────────────────────
  if (showLogin) {
    const canSignIn = phone.length >= 6 && name.trim().length >= 2;
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>

        {/* Clean header — no gradient */}
        <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid #f0f0f0', background: 'white' }}>
          <button onClick={() => setShowLogin(false)} style={{ background: 'none', border: 'none', color: '#888', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '1.25rem', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '1rem' }}>←</span> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Back</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <LogoMark size={42} />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>{t.loginTitle}</h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#999' }}>{t.loginSub}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>{t.phoneLbl}</label>
            <div style={{ display: 'flex', border: '1.5px solid #e8e8e8', borderRadius: '0.65rem', overflow: 'hidden', background: '#fafafa' }}>
              <span style={{ padding: '0 0.85rem', borderRight: '1.5px solid #e8e8e8', color: '#888', fontSize: '0.85rem', background: '#f5f5f5', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>🇮🇳 +91</span>
              <input type="tel" maxLength={10} placeholder={t.phonePh} value={phone} onChange={e => setPhone(e.target.value)} style={{ flex: 1, border: 'none', padding: '0.85rem 0.75rem', fontSize: '0.92rem', outline: 'none', background: 'transparent' }} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t.nameLbl}</label>
            <input
              type="text"
              placeholder={t.namePh}
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#b91c1c')}
              onBlur={e => (e.target.style.borderColor = '#e8e8e8')}
            />
          </div>

          <button
            onClick={() => canSignIn && onLogin()}
            style={{ width: '100%', padding: '0.95rem', borderRadius: '0.65rem', border: 'none', background: canSignIn ? 'linear-gradient(135deg, #b91c1c, #c2185b)' : '#f0f0f0', color: canSignIn ? 'white' : '#aaa', fontSize: '0.9rem', fontWeight: 700, cursor: canSignIn ? 'pointer' : 'not-allowed', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: canSignIn ? '0 4px 16px rgba(185,28,28,0.25)' : 'none', transition: 'all 0.2s' }}
          >
            {t.signIn}
          </button>

          <p style={{ textAlign: 'center', color: '#b91c1c', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.02em' }}>{t.forgotHelp}</p>
        </div>
      </div>
    );
  }

  // ── Main auth screen ──────────────────────────────────
  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>

      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid #f5f5f5' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}>
          <span>{t.back}</span>
        </button>
        <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} style={{ padding: '0.35rem 0.75rem', borderRadius: '2rem', border: '1px solid #d0d0d0', background: 'white', color: '#555', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
          {lang === 'en' ? '🌐 தமிழ்' : '🌐 English'}
        </button>
      </div>

      {/* Hero section — clean white */}
      <div style={{ padding: '2rem 1.5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid #f5f5f5' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
          <LogoMark size={50} />
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#aaa', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.welcome}</p>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
              MotherCare<span style={{ color: '#b91c1c' }}>+</span>
            </h1>
          </div>
        </div>
        {/* Decorative divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', margin: '0.6rem 0' }}>
          <div style={{ height: 1, width: 40, background: '#e8e8e8' }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#b91c1c"><path d="M5 0l1.5 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h3.5z"/></svg>
          <div style={{ height: 1, width: 40, background: '#e8e8e8' }} />
        </div>
        <p style={{ margin: 0, fontSize: '0.78rem', color: '#999', lineHeight: 1.55, maxWidth: 260, margin: '0 auto' }}>{t.sub}</p>
      </div>

      {/* Buttons */}
      <div style={{ flex: 1, padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

        {/* Register */}
        <button onClick={onRegister} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, #b91c1c, #c2185b)', border: 'none', borderRadius: '0.85rem', padding: '1rem 1.1rem', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 18px rgba(185,28,28,0.22)' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: 'white', letterSpacing: '0.01em' }}>{t.register}</p>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>{t.registerDesc}</p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 'auto', fontSize: '1.1rem' }}>›</span>
        </button>

        {/* Login */}
        <button onClick={() => setShowLogin(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', border: '1.5px solid #e8e8e8', borderRadius: '0.85rem', padding: '1rem 1.1rem', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: '#1a1a1a', letterSpacing: '0.01em' }}>{t.login}</p>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.72rem', color: '#999' }}>{t.loginDesc}</p>
          </div>
          <span style={{ color: '#b91c1c', marginLeft: 'auto', fontSize: '1.1rem' }}>›</span>
        </button>

        {/* Trust badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f5f5f5' }}>
          {t.badges.map((b, i) => (
            <span key={i} style={{ fontSize: '0.68rem', color: '#aaa', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
