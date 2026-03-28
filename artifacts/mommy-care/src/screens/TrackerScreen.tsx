import React, { useState, useEffect, useRef } from 'react';
import { speak } from '../utils/speak';
import type { Lang } from '../App';

const tx = {
  en: {
    title: 'My Timeline',
    ironTitle: 'Iron & Folic Acid',
    ironDesc: 'Daily required supplement',
    kickTitle: 'Kick Counter',
    kickDesc: 'Count 10 movements a day',
    trimesterTitle: 'Second Trimester',
    week14: 'Week 14 (Current)',
    week15: 'Week 15',
    week16: 'Week 16',
    scanBook: 'e-Scan Book',
    scanName: 'Nuchal Translucency Scan',
    scanDate: 'Week 12',
    scanStatus: 'Completed & Verified',
    scanVerify: 'Govt Verified',
    scanView: 'View Report',
    reportTitle: '📄 Ultrasound Report',
    reportDate: 'Date: April 10, 2025',
    reportWeek: 'Age: 12 weeks 3 days',
    reportBaby: 'Baby: Normal development',
    reportHeart: 'Heart rate: 158 bpm',
    closeBtn: 'Close',
    ammaBtn: 'Chat with AI Amma',
    ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',
    ammaDefault: 'I am here for you. Please eat healthy food and take rest. If you feel unwell, contact a doctor.',
    ammaMed: 'Please take rest and drink water. If it continues, consult your doctor.',
    typeMsg: 'Type your message...',
    send: 'Send',
    back: '← Back',
  },
  ta: {
    title: 'என் நேரகோடு',
    ironTitle: 'இரும்பு & ஃபோலிக் ஆசிட்',
    ironDesc: 'தினமும் எடுக்க வேண்டிய மாத்திரை',
    kickTitle: 'உதை எண்ணி',
    kickDesc: 'ஒரு நாளில் 10 அசைவுகளை எண்ணவும்',
    trimesterTitle: 'இரண்டாம் திமஸ்டர்',
    week14: 'வாரம் 14 (தற்போது)',
    week15: 'வாரம் 15',
    week16: 'வாரம் 16',
    scanBook: 'ஈ-ஸ்கேன் புத்தகம்',
    scanName: 'நியூக்கல் ட்ரான்ஸ்லூஸென்சி ஸ்கேன்',
    scanDate: 'வாரம் 12',
    scanStatus: 'முடிந்தது & சரிபார்க்கப்பட்டது',
    scanVerify: 'அரசு சரிபார்ப்பு',
    scanView: 'அறிக்கை பார்க்க',
    reportTitle: '📄 அல்ட்ராசவுண்ட் அறிக்கை',
    reportDate: 'தேதி: ஏப்ரல் 10, 2025',
    reportWeek: 'வயது: 12 வாரம் 3 நாட்கள்',
    reportBaby: 'குழந்தை: சாதாரண வளர்ச்சி',
    reportHeart: 'இதயத் துடிப்பு: 158 bpm',
    closeBtn: 'மூடு',
    ammaBtn: 'AI அம்மாவுடன் பேசு',
    ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உடல்நிலை எப்படி? ❤️',
    ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவு சாப்பிட்டு ஓய்வெடுக்கவும்.',
    ammaMed: 'ஓய்வெடுத்து தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.',
    typeMsg: 'செய்தியை தட்டச்சு செய்க...',
    send: 'அனுப்பு',
    back: '← பின்செல்',
  },
};

interface ChatMsg { sender: 'user' | 'amma'; text: string; }
interface Props { lang: Lang; }

export default function TrackerScreen({ lang }: Props) {
  const t = tx[lang] ?? tx.en;
  const [ironDone, setIronDone] = useState(false);
  const [kickCount, setKickCount] = useState(2);
  const [showScan, setShowScan] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showAmma, setShowAmma] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAmma && chatMsgs.length === 0) {
      setChatMsgs([{ sender: 'amma', text: t.ammaWelcome }]);
    }
  }, [showAmma]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const msgs: ChatMsg[] = [...chatMsgs, { sender: 'user', text: chatInput }];
    setChatMsgs(msgs);
    setChatInput('');
    const lower = chatInput.toLowerCase();
    const response = (lower.includes('pain') || lower.includes('headache') || lower.includes('fever') ||
      lower.includes('வலி') || lower.includes('தலைவலி')) ? t.ammaMed : t.ammaDefault;
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
      speak(response, lang);
    }, 700);
  };

  // AI Amma view
  if (showAmma) {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem', background: '#f5f0e8' }}>
        <div style={{ flexShrink: 0, marginBottom: '0.75rem' }}>
          <button onClick={() => setShowAmma(false)} style={{ background: 'none', border: '1.5px solid #e91e63', color: '#e91e63', borderRadius: '2rem', padding: '0.4rem 0.9rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{t.back}</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#c2185b,#e91e63)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>👩‍⚕️</div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>{t.ammaBtn}</h2>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', background: 'white', borderRadius: '1rem', padding: '1rem', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {chatMsgs.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-amma'}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={{ flexShrink: 0, display: 'flex', gap: '0.5rem' }}>
          <input className="text-input" style={{ flex: 1 }} value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={t.typeMsg} onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="btn-pink" style={{ width: 'auto', padding: '0 1.1rem', borderRadius: '2rem' }} onClick={handleSend}>{t.send}</button>
        </div>
      </div>
    );
  }

  // Report view
  if (showReport) {
    return (
      <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
        <button onClick={() => setShowReport(false)} style={{ background: 'none', border: '1.5px solid #e91e63', color: '#e91e63', borderRadius: '2rem', padding: '0.4rem 0.9rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1rem' }}>{t.back}</button>
        <div className="card" style={{ borderLeft: '4px solid #e91e63' }}>
          <h2 style={{ margin: '0 0 0.85rem', color: '#b91c1c', fontWeight: 700 }}>{t.reportTitle}</h2>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem' }}>🗓 {t.reportDate}</p>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem' }}>👶 {t.reportWeek}</p>
          <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem' }}>✅ {t.reportBaby}</p>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>❤️ {t.reportHeart}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fadeIn" style={{ padding: '1.25rem 1rem 1rem', background: '#f5f0e8', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 1rem' }}>{t.title}</h1>

      {/* Iron & Folic Acid */}
      <div onClick={() => setIronDone(v => !v)} style={{ background: ironDone ? '#fce4ec' : '#fff0f0', borderRadius: '1rem', padding: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>💊</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{t.ironTitle}</p>
          <p style={{ margin: '0.1rem 0 0', fontSize: '0.78rem', color: '#888' }}>{t.ironDesc}</p>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: '50%', border: '2.5px solid #e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e63', fontSize: '1rem', background: ironDone ? '#fce4ec' : 'white' }}>
          {ironDone ? '✓' : ''}
        </div>
      </div>

      {/* Kick Counter */}
      <div onClick={() => setKickCount(v => v < 10 ? v + 1 : 0)} style={{ background: 'white', border: '2px solid #4CAF50', borderRadius: '1rem', padding: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>🦶</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{t.kickTitle}</p>
          <p style={{ margin: '0.1rem 0 0', fontSize: '0.78rem', color: '#888' }}>{t.kickDesc}</p>
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4CAF50' }}>{kickCount}/10</span>
      </div>

      {/* Second Trimester */}
      <div className="card" style={{ marginBottom: '0.75rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{t.trimesterTitle}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {[
            { label: t.week14, active: true },
            { label: t.week15, active: false },
            { label: t.week16, active: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', opacity: item.active ? 1 : 0.5 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: item.active ? '#e91e63' : '#bbb', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem', fontWeight: item.active ? 700 : 400, color: '#1a1a1a' }}>
                {i === 0 ? '🥗' : i === 1 ? '💉' : '🩺'} {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* e-Scan Book */}
      <div className="card" onClick={() => setShowScan(v => !v)} style={{ marginBottom: '0.75rem', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1rem' }}>📖</span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1565c0' }}>{t.scanBook}</span>
          </div>
          <span style={{ color: '#1565c0', fontSize: '0.85rem' }}>▼</span>
        </div>
        {showScan && (
          <div className="fadeIn" style={{ marginTop: '0.75rem', background: '#f8fffe', borderRadius: '0.75rem', padding: '0.75rem', borderLeft: '4px solid #4CAF50' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1a1a1a' }}>{t.scanName}</span>
              <span style={{ fontSize: '0.78rem', color: '#888' }}>{t.scanDate}</span>
            </div>
            <p style={{ margin: '0 0 0.5rem', color: '#4CAF50', fontWeight: 600, fontSize: '0.82rem' }}>✓ {t.scanStatus}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dashed #e0e0e0' }}>
              <span style={{ fontSize: '0.78rem', color: '#1565c0', fontWeight: 600 }}>✅ {t.scanVerify}</span>
              <button onClick={e => { e.stopPropagation(); setShowReport(true); }} style={{ background: '#fce4ec', border: 'none', borderRadius: '0.5rem', padding: '0.3rem 0.7rem', color: '#e91e63', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                📄 {t.scanView}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Amma button */}
      <button className="btn-pink" onClick={() => setShowAmma(true)} style={{ marginTop: 'auto', boxShadow: '0 6px 20px rgba(194,24,91,0.35)' }}>
        <span style={{ fontSize: '1.3rem' }}>👩‍⚕️</span> {t.ammaBtn}
      </button>
    </div>
  );
}
