import React, { useState, useEffect, useRef } from 'react';
import { speak } from '../utils/speak';
import type { Lang } from '../App';

const tx = {
  en: {
    title: 'My Timeline',
    ironTitle: 'Iron & Folic Acid', ironDesc: 'Daily supplement — tap to mark',
    kickTitle: 'Kick Counter', kickDesc: 'Count 10 movements/day',
    scanBook: 'e-Scan Book',
    scanVerify: 'Govt Verified', scanView: 'Report',
    ammaBtn: 'Chat with AI Amma',
    ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',
    ammaDefault: 'I am here for you. Eat well, rest, and stay hydrated. Contact your doctor if unwell.',
    ammaMed: 'Please rest and drink water. If symptoms continue, see your doctor immediately.',
    typeMsg: 'Ask AI Amma...', send: 'Send', back: '← Back',
    scans: (w: number, name: string) => [
      { name: 'Dating Scan', week: 'Week 8', done: true, status: 'Completed', date: 'Done', detail: `${name} – NT measurement normal` },
      { name: 'Nuchal Translucency Scan', week: 'Week 12', done: true, status: 'Completed', date: 'Done', detail: `${name} – Down syndrome: Low Risk` },
      { name: 'Anomaly Scan', week: 'Week 20', done: w >= 20, status: w >= 20 ? 'Completed' : 'Upcoming', date: w >= 20 ? 'Done' : 'Scheduled', detail: 'Full fetal anatomy survey' },
      { name: 'Growth Scan', week: 'Week 32', done: w >= 32, status: w >= 32 ? 'Completed' : 'Upcoming', date: w >= 32 ? 'Done' : 'Scheduled', detail: 'Baby weight & position check' },
      { name: 'Pre-delivery Scan', week: 'Week 36', done: w >= 36, status: w >= 36 ? 'Completed' : 'Upcoming', date: w >= 36 ? 'Done' : 'Scheduled', detail: 'Final position & liquor check' },
    ],
    trimLabels: ['Week', 'Current', 'Next', 'Week after'],
  },
  ta: {
    title: 'என் நேரகோடு',
    ironTitle: 'இரும்பு & ஃபோலிக் ஆசிட்', ironDesc: 'தினசரி மாத்திரை — தட்டி குறி',
    kickTitle: 'உதை எண்ணி', kickDesc: '10 அசைவுகள்/நாள்',
    scanBook: 'ஈ-ஸ்கேன் புத்தகம்',
    scanVerify: 'அரசு சரிபார்ப்பு', scanView: 'அறிக்கை',
    ammaBtn: 'AI அம்மாவுடன் பேசு',
    ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உடல்நிலை எப்படி? ❤️',
    ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவு சாப்பிட்டு ஓய்வெடுக்கவும்.',
    ammaMed: 'ஓய்வெடுத்து தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.',
    typeMsg: 'AI அம்மாவிடம் கேளுங்கள்...', send: 'அனுப்பு', back: '← பின்செல்',
    scans: (w: number, name: string) => [
      { name: 'டேட்டிங் ஸ்கேன்', week: 'வாரம் 8', done: true, status: 'முடிந்தது', date: 'முடிந்தது', detail: `${name} – NT அளவீடு சாதாரணம்` },
      { name: 'நியூக்கல் ஸ்கேன்', week: 'வாரம் 12', done: true, status: 'முடிந்தது', date: 'முடிந்தது', detail: `${name} – டவுன் சிண்ட்ரோம்: குறைந்த அபாயம்` },
      { name: 'அனாமலி ஸ்கேன்', week: 'வாரம் 20', done: w >= 20, status: w >= 20 ? 'முடிந்தது' : 'வரவிருக்கிறது', date: w >= 20 ? 'முடிந்தது' : 'திட்டமிடப்பட்டது', detail: 'குழந்தை உடல் அமைப்பு சர்வே' },
      { name: 'வளர்ச்சி ஸ்கேன்', week: 'வாரம் 32', done: w >= 32, status: w >= 32 ? 'முடிந்தது' : 'வரவிருக்கிறது', date: w >= 32 ? 'முடிந்தது' : 'திட்டமிடப்பட்டது', detail: 'குழந்தை எடை & நிலை சோதனை' },
      { name: 'பிரசவ முன் ஸ்கேன்', week: 'வாரம் 36', done: w >= 36, status: w >= 36 ? 'முடிந்தது' : 'வரவிருக்கிறது', date: w >= 36 ? 'முடிந்தது' : 'திட்டமிடப்பட்டது', detail: 'இறுதி நிலை சோதனை' },
    ],
    trimLabels: ['வாரம்', 'தற்போது', 'அடுத்து', 'பிறகு'],
  },
};

interface ChatMsg { sender: 'user' | 'amma'; text: string; }
interface Props { lang: Lang; patientData?: Record<string, string>; }

export default function TrackerScreen({ lang, patientData }: Props) {
  const t = tx[lang] ?? tx.en;
  const currentWeek = parseInt(patientData?.weeks || '14');
  const patientName = patientData?.name?.split(' ')[0] || 'Patient';
  const today = new Date(2026, 2, 28);
  const todayStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const [ironDone, setIronDone] = useState(false);
  const [kickCount, setKickCount] = useState(2);
  const [showScan, setShowScan] = useState(false);
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
    setChatMsgs(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    const lower = chatInput.toLowerCase();
    const response = (lower.includes('pain') || lower.includes('headache') || lower.includes('fever') || lower.includes('வலி')) ? t.ammaMed : t.ammaDefault;
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
      speak(response, lang);
    }, 700);
  };

  const scans = t.scans(currentWeek, patientName);
  const trimesterLabel = currentWeek <= 13 ? (lang === 'ta' ? 'முதல் திமஸ்டர்' : 'First Trimester') : currentWeek <= 26 ? (lang === 'ta' ? 'இரண்டாம் திமஸ்டர்' : 'Second Trimester') : (lang === 'ta' ? 'மூன்றாம் திமஸ்டர்' : 'Third Trimester');

  // AI Amma
  if (showAmma) {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.75rem', background: '#f5f0e8' }}>
        <div style={{ flexShrink: 0, marginBottom: '0.5rem' }}>
          <button onClick={() => setShowAmma(false)} style={{ background: 'none', border: '1.5px solid #e91e63', color: '#e91e63', borderRadius: '2rem', padding: '0.3rem 0.75rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{t.back}</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#c2185b,#e91e63)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>👩‍⚕️</div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{t.ammaBtn}</h2>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', background: 'white', borderRadius: '0.85rem', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {chatMsgs.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-amma'} style={{ fontSize: '0.82rem' }}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={{ flexShrink: 0, display: 'flex', gap: '0.4rem' }}>
          <input className="text-input" style={{ flex: 1, fontSize: '0.82rem', padding: '0.65rem 0.85rem' }} value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={t.typeMsg} onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="btn-pink" style={{ width: 'auto', padding: '0 0.85rem', borderRadius: '2rem', fontSize: '0.82rem' }} onClick={handleSend}>{t.send}</button>
        </div>
      </div>
    );
  }

  // Scan Book overlay
  const ScanOverlay = () => (
    <div onClick={() => setShowScan(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 50, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '1.25rem 1.25rem 0 0', width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1565c0' }}>📖 {t.scanBook}</h3>
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#888' }}>{patientData?.name || patientName} • {todayStr}</p>
          </div>
          <button onClick={() => setShowScan(false)} style={{ background: '#e3f2fd', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#1565c0', fontWeight: 700, fontSize: '0.8rem' }}>✕</button>
        </div>
        {/* Patient Summary */}
        <div style={{ padding: '0.6rem 1rem', background: '#e3f2fd', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { l: 'Patient', v: patientData?.name || patientName },
              { l: 'Age', v: patientData?.age ? `${patientData.age} yrs` : '–' },
              { l: 'Week', v: `Week ${currentWeek}` },
              { l: 'Blood', v: patientData?.blood || '–' },
            ].map((row, i) => (
              <div key={i}>
                <p style={{ margin: 0, fontSize: '0.62rem', color: '#1565c0', fontWeight: 600 }}>{row.l}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#1a1a1a' }}>{row.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '0.65rem 1rem 1rem' }}>
          {scans.map((sc, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', alignItems: 'center', background: sc.done ? '#e8f5e9' : '#fafafa', borderRadius: '0.65rem', padding: '0.55rem 0.65rem', border: sc.done ? '1px solid #c8e6c9' : '1px solid #f0f0f0' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: sc.done ? '#4CAF50' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{sc.done ? '✓' : '?'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: sc.done ? '#2e7d32' : '#1a1a1a' }}>{sc.name}</span>
                  <span style={{ fontSize: '0.62rem', background: sc.done ? '#4CAF50' : '#e0e0e0', color: sc.done ? 'white' : '#888', borderRadius: '1rem', padding: '0.1rem 0.45rem', fontWeight: 600 }}>{sc.status}</span>
                </div>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.65rem', color: '#888' }}>{sc.week} • {sc.detail}</p>
              </div>
            </div>
          ))}
          <div style={{ background: '#fff3e0', borderRadius: '0.65rem', padding: '0.6rem 0.75rem', marginTop: '0.25rem', border: '1px solid #ffe0b2' }}>
            <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#e65100' }}>📋 Govt. Verified Passbook</p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.65rem', color: '#888' }}>Updated: {todayStr} • ✅ {t.scanVerify}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.7rem 0.85rem 0.5rem', background: '#f5f0e8', overflow: 'hidden', gap: '0.45rem' }}>
      <h1 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>{t.title}</h1>

      {/* Iron & Folic Acid */}
      <div onClick={() => setIronDone(v => !v)} style={{ background: ironDone ? '#fce4ec' : '#fff8f8', borderRadius: '0.75rem', padding: '0.55rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>💊</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: '#1a1a1a' }}>{t.ironTitle}</p>
          <p style={{ margin: '0.05rem 0 0', fontSize: '0.68rem', color: '#888' }}>{t.ironDesc}</p>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e63', fontSize: '0.85rem', background: ironDone ? '#fce4ec' : 'white' }}>{ironDone ? '✓' : ''}</div>
      </div>

      {/* Kick Counter */}
      <div onClick={() => setKickCount(v => v < 10 ? v + 1 : 0)} style={{ background: 'white', border: '2px solid #4CAF50', borderRadius: '0.75rem', padding: '0.55rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>🦶</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: '#1a1a1a' }}>{t.kickTitle}</p>
          <p style={{ margin: '0.05rem 0 0', fontSize: '0.68rem', color: '#888' }}>{t.kickDesc}</p>
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4CAF50' }}>{kickCount}/10</span>
      </div>

      {/* Trimester Timeline */}
      <div className="card" style={{ padding: '0.55rem 0.7rem', marginBottom: 0, flexShrink: 0 }}>
        <p style={{ margin: '0 0 0.4rem', fontWeight: 700, fontSize: '0.78rem', color: '#1a1a1a' }}>{trimesterLabel}</p>
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          {[currentWeek, currentWeek + 1, currentWeek + 2].map((w, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', background: i === 0 ? '#fce4ec' : '#f5f5f5', borderRadius: '0.5rem', padding: '0.35rem 0.2rem', border: i === 0 ? '1.5px solid #e91e63' : '1px solid #e0e0e0' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.85rem', color: i === 0 ? '#b91c1c' : '#888' }}>W{w}</p>
              <p style={{ margin: 0, fontSize: '0.6rem', color: i === 0 ? '#e91e63' : '#aaa' }}>{i === 0 ? (lang === 'ta' ? 'தற்போது' : 'Current') : i === 1 ? (lang === 'ta' ? 'அடுத்து' : 'Next') : ''}</p>
            </div>
          ))}
        </div>
      </div>

      {/* e-Scan Book */}
      <div onClick={() => setShowScan(true)} style={{ background: 'white', borderRadius: '0.75rem', padding: '0.55rem 0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', border: '1.5px solid #e3f2fd', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ fontSize: '1rem' }}>📖</span>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: '#1565c0' }}>{t.scanBook}</p>
            <p style={{ margin: 0, fontSize: '0.62rem', color: '#888' }}>{todayStr} • ✅ {t.scanVerify}</p>
          </div>
        </div>
        <span style={{ color: '#1565c0', fontSize: '0.8rem', fontWeight: 600 }}>View ›</span>
      </div>

      {/* AI Amma Button */}
      <button className="btn-pink" onClick={() => setShowAmma(true)} style={{ padding: '0.65rem', fontSize: '0.85rem', borderRadius: '0.75rem', boxShadow: '0 4px 16px rgba(194,24,91,0.3)', flexShrink: 0 }}>
        👩‍⚕️ {t.ammaBtn}
      </button>

      {showScan && <ScanOverlay />}
    </div>
  );
}
