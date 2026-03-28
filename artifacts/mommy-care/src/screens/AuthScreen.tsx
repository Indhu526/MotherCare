import React from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    welcome: 'Welcome to MommyCare',
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
    pinLbl: 'PIN',
    pinPh: '4-digit PIN',
    signIn: 'Sign In',
    forgotPin: 'Forgot PIN?',
  },
  ta: {
    welcome: 'MommyCare-க்கு வரவேற்கிறோம்',
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
    pinLbl: 'PIN',
    pinPh: '4-இலக்க PIN',
    signIn: 'உள்நுழை',
    forgotPin: 'PIN மறந்துவிட்டதா?',
  },
};

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  onRegister: () => void;
  onLogin: () => void;
  onBack: () => void;
}

export default function AuthScreen({ lang, setLang, onRegister, onLogin, onBack }: Props) {
  const t = tx[lang] ?? tx.en;
  const [showLogin, setShowLogin] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [pin, setPin] = React.useState('');

  if (showLogin) {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#fef6f9' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #b91c1c, #e91e63)', padding: '3rem 1.5rem 4rem' }}>
          <button onClick={() => setShowLogin(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: 36, height: 36, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.back}
          </button>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👩‍⚕️</div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>{t.loginTitle}</h2>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{t.loginSub}</p>
        </div>

        <div style={{ background: 'white', borderRadius: '2rem 2rem 0 0', flex: 1, padding: '2rem 1.5rem', marginTop: '-2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#555', marginBottom: '0.4rem' }}>{t.phoneLbl}</label>
            <div style={{ display: 'flex', border: '1.5px solid #e0e0e0', borderRadius: '0.75rem', overflow: 'hidden', background: '#fafafa' }}>
              <span style={{ padding: '0.85rem', borderRight: '1.5px solid #e0e0e0', color: '#888', fontSize: '0.9rem', background: '#f5f5f5' }}>🇮🇳 +91</span>
              <input
                type="tel"
                maxLength={10}
                placeholder={t.phonePh}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ flex: 1, border: 'none', padding: '0.85rem', fontSize: '0.95rem', outline: 'none', background: 'transparent' }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#555', marginBottom: '0.4rem' }}>{t.pinLbl}</label>
            <input
              type="password"
              maxLength={4}
              placeholder={t.pinPh}
              value={pin}
              onChange={e => setPin(e.target.value)}
              className="text-input"
              style={{ borderRadius: '0.75rem' }}
            />
          </div>
          <button
            onClick={() => { if (phone.length >= 6) onLogin(); }}
            style={{ width: '100%', padding: '1rem', borderRadius: '0.85rem', border: 'none', background: 'linear-gradient(135deg, #b91c1c, #e91e63)', color: 'white', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 20px rgba(185,28,28,0.35)', marginBottom: '1rem' }}
          >
            {t.signIn}
          </button>
          <p style={{ textAlign: 'center', color: '#e91e63', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>{t.forgotPin}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#fef6f9' }}>
      {/* Header gradient */}
      <div style={{ background: 'linear-gradient(135deg, #b91c1c, #e91e63)', padding: '3.5rem 1.5rem 5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: 36, height: 36, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.back}
          </button>
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <button
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '2rem', border: '1.5px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
          >
            {lang === 'en' ? '🌐 தமிழ்' : '🌐 English'}
          </button>
        </div>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🤱</div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: 'white', lineHeight: 1.3 }}>{t.welcome}</h1>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, maxWidth: 280, margin: '0.5rem auto 0' }}>{t.sub}</p>
      </div>

      {/* White card */}
      <div style={{ background: 'white', borderRadius: '2rem 2rem 0 0', flex: 1, padding: '2rem 1.5rem', marginTop: '-2rem' }}>
        {/* Register */}
        <button
          onClick={onRegister}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, #b91c1c, #e91e63)', border: 'none', borderRadius: '1rem', padding: '1.25rem 1.25rem', cursor: 'pointer', marginBottom: '0.9rem', textAlign: 'left', boxShadow: '0 6px 20px rgba(185,28,28,0.25)' }}
        >
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>✨</div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '1.05rem', color: 'white' }}>{t.register}</p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>{t.registerDesc}</p>
          </div>
          <span style={{ color: 'white', marginLeft: 'auto', fontSize: '1.3rem' }}>›</span>
        </button>

        {/* Login */}
        <button
          onClick={() => setShowLogin(true)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', border: '2px solid #e91e63', borderRadius: '1rem', padding: '1.25rem 1.25rem', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>👤</div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '1.05rem', color: '#b91c1c' }}>{t.login}</p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#888' }}>{t.loginDesc}</p>
          </div>
          <span style={{ color: '#e91e63', marginLeft: 'auto', fontSize: '1.3rem' }}>›</span>
        </button>

        {/* Decorative badges */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          {['🏥 Govt. Certified', '🔒 Secure & Private', '🌐 Bilingual'].map((b, i) => (
            <span key={i} style={{ background: '#fce4ec', color: '#b91c1c', borderRadius: '2rem', padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
