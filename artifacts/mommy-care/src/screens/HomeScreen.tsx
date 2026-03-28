import React, { useState } from 'react';
import { speak } from '../utils/speak';
import type { Tab, Lang } from '../App';

const tx = {
  en: {
    hello: 'Hello,',
    name: 'malar',
    location: 'Village Block A',
    tapListen: 'Tap to Listen',
    listenText: 'Hello malar! Today take your iron supplement and drink 8 glasses of water. Your next checkup is on October 15.',
    reminders: "Today's Reminders",
    ironSupp: 'Iron Supplement',
    ironDone: 'Done',
    ironPending: 'Take now',
    hydration: 'Hydration',
    hydrationDesc: '0/8 Glasses',
    nextCheckup: 'Next Checkup',
    checkupDate: 'Oct 15, 2026',
    viewCalendar: '📅 View Complete ANC Checkup Calendar',
    pregnancyUpdate: 'Pregnancy Update',
    trimester: 'Trimester 2',
    week: 'Week 14',
    weightGain: '+2kg',
    banner: 'HEALTHY MOTHER\nHEALTHY BABY',
    langBtn: '🌐 தமிழ்',
  },
  ta: {
    hello: 'வணக்கம்,',
    name: 'மலர்',
    location: 'கிராமம் பிளாக் A',
    tapListen: 'கேட்க தட்டவும்',
    listenText: 'வணக்கம் மலர்! இன்று உங்கள் இரும்புச்சத்து மாத்திரை எடுத்துக்கொள்ளுங்கள், 8 கிளாஸ் தண்ணீர் குடிக்கவும். அடுத்த பரிசோதனை அக்டோபர் 15.',
    reminders: 'இன்றைய நினைவூட்டல்கள்',
    ironSupp: 'இரும்புச்சத்து மாத்திரை',
    ironDone: 'எடுத்தாகிவிட்டது',
    ironPending: 'இப்போது எடு',
    hydration: 'நீர் குடிப்பு',
    hydrationDesc: '0/8 கிளாஸ்',
    nextCheckup: 'அடுத்த பரிசோதனை',
    checkupDate: 'அக்டோபர் 15, 2026',
    viewCalendar: '📅 ANC காலெண்டர் பார்க்க',
    pregnancyUpdate: 'கர்ப்பகால தகவல்',
    trimester: 'திமஸ்டர் 2',
    week: 'வாரம் 14',
    weightGain: '+2கிகி',
    banner: 'ஆரோக்கியமான அம்மா\nஆரோக்கியமான குழந்தை',
    langBtn: '🌐 English',
  },
};

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  setTab: (t: Tab) => void;
  patientData?: Record<string, string>;
}

export default function HomeScreen({ lang, setLang, patientData }: Props) {
  const t = tx[lang] ?? tx.en;
  const displayName = patientData?.name?.split(' ')[0]?.toLowerCase() || t.name;
  const displayLocation = patientData?.location || t.location;
  const displayWeek = patientData?.weeks ? `Week ${patientData.weeks}` : t.week;
  const displayTrimester = patientData?.weeks
    ? (parseInt(patientData.weeks) <= 13 ? (lang === 'ta' ? 'திமஸ்டர் 1' : 'Trimester 1') : parseInt(patientData.weeks) <= 26 ? (lang === 'ta' ? 'திமஸ்டர் 2' : 'Trimester 2') : (lang === 'ta' ? 'திமஸ்டர் 3' : 'Trimester 3'))
    : t.trimester;
  const [ironDone, setIronDone] = useState(true);
  const [listening, setListening] = useState(false);

  const handleListen = () => {
    setListening(true);
    speak(t.listenText, lang);
    setTimeout(() => setListening(false), 5000);
  };

  return (
    <div className="fadeIn" style={{ padding: '1.25rem 1rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
          <span style={{ color: '#aaa', fontSize: '1.3rem', marginTop: 2, lineHeight: 1 }}>⋮</span>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>{t.hello} {displayName}</h1>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#888' }}>{displayLocation}</p>
          </div>
        </div>
        <button
          className="lang-btn"
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
        >
          {t.langBtn}
        </button>
      </div>

      {/* Tap to Listen */}
      <button
        className="btn-red"
        style={{ marginBottom: '1.25rem', boxShadow: listening ? '0 0 0 5px rgba(185,28,28,0.15)' : '0 4px 12px rgba(185,28,28,0.25)' }}
        onClick={handleListen}
      >
        <span style={{ fontSize: '1.1rem' }}>🔊</span> {t.tapListen}
      </button>

      {/* Today's Reminders */}
      <div className="card" style={{ marginBottom: '0.75rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a1a', marginBottom: '0.1rem' }}>{t.reminders}</p>

        {/* Iron Supplement */}
        <div className="reminder-row" onClick={() => setIronDone(v => !v)} style={{ cursor: 'pointer' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>💊</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{t.ironSupp}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: ironDone ? '#4CAF50' : '#aaa' }}>{ironDone ? t.ironDone : t.ironPending}</p>
          </div>
          <span style={{ color: '#e91e63', fontSize: '1.3rem', lineHeight: 1 }}>{ironDone ? '✓' : '○'}</span>
        </div>

        {/* Hydration */}
        <div className="reminder-row">
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>💧</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{t.hydration}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#aaa' }}>{t.hydrationDesc}</p>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #ccc' }} />
        </div>

        {/* Next Checkup */}
        <div className="reminder-row">
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>🏥</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{t.nextCheckup}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#aaa' }}>{t.checkupDate}</p>
          </div>
          <span style={{ color: '#ccc', fontSize: '1.2rem' }}>›</span>
        </div>

        {/* ANC Calendar link */}
        <div style={{ border: '1.5px dashed #e91e63', borderRadius: '0.6rem', padding: '0.6rem 0.75rem', marginTop: '0.75rem', textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#e91e63', fontSize: '0.85rem', fontWeight: 600 }}>{t.viewCalendar}</span>
        </div>
      </div>

      {/* Pregnancy Update */}
      <div className="card" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span style={{ color: '#e91e63', fontSize: '0.85rem' }}>♡</span>
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a1a1a' }}>{t.pregnancyUpdate}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#888' }}>{displayTrimester}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#e91e63' }}>{displayWeek}</span>
          <span style={{ background: '#fce4ec', color: '#e91e63', borderRadius: '0.3rem', padding: '0.15rem 0.45rem', fontSize: '0.75rem', fontWeight: 700 }}>{t.weightGain}</span>
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 60%, #ad1457 100%)', borderRadius: '1rem', padding: '1.4rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'white', lineHeight: 1.45, whiteSpace: 'pre-line', letterSpacing: '0.03em' }}>{t.banner}</p>
        <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>♥</p>
      </div>
    </div>
  );
}
