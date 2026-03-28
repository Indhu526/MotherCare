import React, { useState, useEffect, useRef } from 'react';
import { speak } from '../utils/speak';

const translations = {
  en: {
    title: '📅 My Pregnancy Tracker',
    pillTitle: 'Iron & Folic Acid Tablet',
    pillDesc: 'Tap to mark today\'s dose',
    pillDone: 'Taken today!',
    kickTitle: 'Baby Kick Counter',
    kickDesc: 'Tap to record a kick',
    trimester: '📋 Upcoming Schedule',
    w14: 'Week 14: Iron-rich diet',
    w15: 'Week 15: Anatomy scan',
    w16: 'Week 16: Doctor checkup',
    passbookTitle: 'Scan Passbook',
    scan1: 'Week 12',
    scan1Desc: 'Nuchal Translucency Scan',
    scan1Status: 'Completed & Verified',
    verify: 'Govt Verified',
    download: 'View Report',
    notes: 'NOTES',
    reportTitle: '📄 Ultrasound Report',
    reportDate: 'Date: April 10, 2025',
    reportWeek: 'Gestational Age: 12 weeks 3 days',
    reportBaby: 'Baby: Normal development',
    reportHeart: 'Heart rate: 158 bpm',
    reportClose: 'Close',
    ammaChatBtn: 'Chat with AI Amma',
    typeMsg: 'Type your message...',
    send: 'Send',
    ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',
    ammaDefault: 'I am here for you. Please eat healthy food and take rest. If you feel unwell, contact a doctor.',
    ammaMed: 'Please take rest and drink water. If it continues, consult your doctor.',
    backBtn: 'Back',
  },
  ta: {
    title: '📅 என் கர்ப்பகால கண்காணிப்பு',
    pillTitle: 'இரும்பு மற்றும் ஃபோலிக் ஆசிட் மாத்திரை',
    pillDesc: 'இன்றைய அளவை குறிக்க தட்டவும்',
    pillDone: 'இன்று எடுத்தாகிவிட்டது!',
    kickTitle: 'குழந்தை உதை எண்ணி',
    kickDesc: 'உதையை பதிவு செய்ய தட்டவும்',
    trimester: '📋 வரவிருக்கும் அட்டவணை',
    w14: 'வாரம் 14: இரும்புச்சத்து உணவு',
    w15: 'வாரம் 15: உடற்கூறு ஸ்கேன்',
    w16: 'வாரம் 16: டாக்டர் பரிசோதனை',
    passbookTitle: 'ஸ்கேன் பாஸ்புக்',
    scan1: 'வாரம் 12',
    scan1Desc: 'நியூக்கல் டிரான்ஸ்லூசன்சி ஸ்கேன்',
    scan1Status: 'முடிந்தது & சரிபார்க்கப்பட்டது',
    verify: 'அரசு சரிபார்க்கப்பட்டது',
    download: 'அறிக்கை பார்க்க',
    notes: 'குறிப்புகள்',
    reportTitle: '📄 அல்ட்ராசவுண்ட் அறிக்கை',
    reportDate: 'தேதி: ஏப்ரல் 10, 2025',
    reportWeek: 'கர்ப்பகால வயது: 12 வாரம் 3 நாட்கள்',
    reportBaby: 'குழந்தை: சாதாரண வளர்ச்சி',
    reportHeart: 'இதயத் துடிப்பு: 158 bpm',
    reportClose: 'மூடு',
    ammaChatBtn: 'AI அம்மாவுடன் பேசுங்கள்',
    typeMsg: 'உங்கள் செய்தியை தட்டச்சு செய்க...',
    send: 'அனுப்பு',
    ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உங்கள் உடல்நிலை எப்படி உள்ளது? ❤️',
    ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவைச் சாப்பிட்டு ஓய்வெடுக்கவும். உடல்நிலை சரியில்லையென்றால் மருத்துவரை அணுகவும்.',
    ammaMed: 'கொஞ்சம் ஓய்வு எடுத்துக்கொள்ளுங்கள், தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.',
    backBtn: 'பின்செல்',
  },
};

interface Props {
  language: string;
}

interface ChatMsg {
  sender: 'user' | 'amma';
  text: string;
}

export default function CalendarScreen({ language }: Props) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [tookPill, setTookPill] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [showScanBook, setShowScanBook] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [viewAmma, setViewAmma] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleTakePill = () => {
    if (!tookPill) {
      setTookPill(true);
      speak(t.pillDone, language);
    }
  };

  const handleRecordKick = () => {
    const next = kickCount + 1;
    setKickCount(next);
    if (next >= 10) speak('Great! Baby has kicked 10 times!', language);
  };

  const handleSendAmma = () => {
    if (!chatInput.trim()) return;
    const newMsgs: ChatMsg[] = [...chatMsgs, { sender: 'user', text: chatInput }];
    setChatMsgs(newMsgs);
    setChatInput('');
    const lower = chatInput.toLowerCase();
    let response = t.ammaDefault;
    if (lower.includes('headache') || lower.includes('pain') || lower.includes('fever') ||
        lower.includes('தலைவலி') || lower.includes('வலி') || lower.includes('காய்ச்சல்')) {
      response = t.ammaMed;
    }
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
      speak(response, language);
    }, 800);
  };

  useEffect(() => {
    if (viewAmma && chatMsgs.length === 0) {
      setChatMsgs([{ sender: 'amma', text: t.ammaWelcome }]);
      speak(t.ammaWelcome, language);
    }
  }, [viewAmma]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  // Amma Chat View
  if (viewAmma) {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexShrink: 0, marginBottom: '0.75rem' }}>
          <button onClick={() => setViewAmma(false)} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '0.75rem' }}>← {t.backBtn}</button>
          <h1 className="screen-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0' }}>
            <div style={{ background: 'hsl(336,72%,45%)', color: 'white', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👩‍⚕️</div>
            {t.ammaChatBtn}
          </h1>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', background: 'white', borderRadius: '1rem', padding: '1rem', marginBottom: '0.75rem', border: '1.5px solid hsl(336,72%,88%)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {chatMsgs.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-amma'}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={{ flexShrink: 0, display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder={t.typeMsg}
            className="text-input"
            style={{ borderRadius: '2rem', flex: 1 }}
            onKeyDown={e => e.key === 'Enter' && handleSendAmma()}
          />
          <button onClick={handleSendAmma} className="btn btn-primary" style={{ width: 'auto', padding: '0 1.25rem', borderRadius: '2rem' }}>{t.send}</button>
        </div>
      </div>
    );
  }

  // Report modal
  if (showReport) {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <button onClick={() => setShowReport(false)} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '1rem' }}>← {t.reportClose}</button>
        <div className="card" style={{ borderLeft: '4px solid hsl(336,72%,45%)' }}>
          <h2 style={{ margin: '0 0 1rem', color: 'var(--primary-dark)' }}>{t.reportTitle}</h2>
          <p>🗓 {t.reportDate}</p>
          <p>👶 {t.reportWeek}</p>
          <p>✅ {t.reportBaby}</p>
          <p>❤️ {t.reportHeart}</p>
          <div style={{ marginTop: '1rem', background: 'hsl(336,72%,95%)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center', color: 'hsl(336,72%,40%)', fontSize: '0.85rem', fontWeight: 600 }}>
            🏥 Government of Tamil Nadu — Verified Health Record
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h1 className="screen-title">{t.title}</h1>

      {/* AI Amma button */}
      <button className="btn" onClick={() => setViewAmma(true)} style={{ background: 'var(--primary-dark)', color: 'white', justifyContent: 'flex-start', border: 'none', borderRadius: '1rem', boxShadow: '0 6px 16px rgba(194,24,91,0.3)' }}>
        <span style={{ fontSize: '1.6rem' }}>👩‍⚕️</span> {t.ammaChatBtn}
      </button>

      {/* Pill reminder */}
      <div className="card" onClick={handleTakePill} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', background: tookPill ? 'hsl(336,72%,97%)' : 'white', border: `1.5px solid ${tookPill ? 'hsl(336,72%,75%)' : 'hsl(340,20%,91%)'}` }}>
        <div style={{ background: 'hsl(336,72%,45%)', height: 44, width: 44, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>💊</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-dark)' }}>{t.pillTitle}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>{tookPill ? t.pillDone : t.pillDesc}</p>
        </div>
        <div style={{ fontSize: '1.5rem' }}>{tookPill ? '✅' : '⭕'}</div>
      </div>

      {/* Kick counter */}
      <div className="card" onClick={handleRecordKick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', background: kickCount >= 10 ? '#E8F5E9' : 'white', border: `1.5px solid ${kickCount >= 10 ? '#4CAF50' : 'hsl(340,20%,91%)'}` }}>
        <div style={{ background: '#4CAF50', height: 44, width: 44, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>🦶</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1rem', color: '#2E7D32', margin: 0 }}>{t.kickTitle}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0.2rem 0 0' }}>{t.kickDesc}</p>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2E7D32' }}>{kickCount}/10</div>
      </div>

      {/* Schedule */}
      <div className="card">
        <h2 style={{ fontSize: '1rem', margin: '0 0 0.75rem' }}>{t.trimester}</h2>
        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid hsl(336,72%,88%)' }}>
          {[t.w14, t.w15, t.w16].map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < 2 ? '0.6rem' : 0, opacity: i === 0 ? 1 : 0.55 }}>
              <div style={{ position: 'absolute', left: '-1.85rem', top: 2, background: i === 0 ? 'hsl(336,72%,45%)' : 'var(--text-muted)', width: 14, height: 14, borderRadius: '50%' }} />
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: i === 0 ? 600 : 400 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scan passbook */}
      <div className="card" onClick={() => setShowScanBook(!showScanBook)} style={{ background: '#F8FBFF', border: '1.5px solid #E3F2FD', cursor: 'pointer' }}>
        <h2 style={{ fontSize: '1rem', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1976D2' }}>
          <span>📖 {t.passbookTitle}</span>
          <span style={{ fontSize: '0.9rem' }}>{showScanBook ? '▲' : '▼'}</span>
        </h2>
        {showScanBook && (
          <div className="fadeIn" style={{ background: 'white', padding: '0.75rem', borderRadius: '0.75rem', borderLeft: '4px solid #4CAF50', marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>{t.scan1Desc}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.scan1}</span>
            </div>
            <p style={{ color: '#4CAF50', fontWeight: 600, margin: '0 0 0.5rem', fontSize: '0.85rem' }}>✓ {t.scan1Status}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dashed #eee' }}>
              <span style={{ fontSize: '0.8rem', color: '#1976D2' }}>✅ {t.verify}</span>
              <button style={{ background: 'hsl(336,72%,92%)', padding: '0.3rem 0.7rem', borderRadius: '0.5rem', border: 'none', color: 'var(--primary-dark)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={(e) => { e.stopPropagation(); setShowReport(true); }}>
                📄 {t.download}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
