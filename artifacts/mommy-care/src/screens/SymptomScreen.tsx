import React, { useState } from 'react';
import { speak } from '../utils/speak';

const translations = {
  en: {
    title: '🩺 Symptom Checker',
    subtitle: 'How are you feeling today?',
    symptoms: [
      { emoji: '🤒', label: 'Fever', danger: false },
      { emoji: '🤢', label: 'Nausea / Vomiting', danger: false },
      { emoji: '💔', label: 'Chest Pain', danger: true },
      { emoji: '🤕', label: 'Headache', danger: false },
      { emoji: '🩸', label: 'Bleeding', danger: true },
      { emoji: '😮‍💨', label: 'Shortness of Breath', danger: true },
      { emoji: '🦵', label: 'Leg Swelling', danger: false },
      { emoji: '👁️', label: 'Blurred Vision', danger: true },
      { emoji: '🔺', label: 'High Blood Pressure', danger: true },
      { emoji: '😫', label: 'Severe Abdominal Pain', danger: true },
    ],
    checkBtn: 'Check Symptoms',
    clearBtn: 'Clear',
    resultTitle: 'Symptom Assessment',
    dangerAlert: '🚨 URGENT: Please contact your doctor or call 108 immediately!',
    mildAlert: '💡 Mild symptoms detected. Rest, hydrate, and monitor. Contact your doctor if it worsens.',
    noSymptoms: 'Please select at least one symptom.',
    selected: 'selected',
    backBtn: 'Back',
    callDoc: 'Call Doctor (108)',
  },
  ta: {
    title: '🩺 அறிகுறி சரிபார்ப்பு',
    subtitle: 'இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
    symptoms: [
      { emoji: '🤒', label: 'காய்ச்சல்', danger: false },
      { emoji: '🤢', label: 'குமட்டல் / வாந்தி', danger: false },
      { emoji: '💔', label: 'மார்பு வலி', danger: true },
      { emoji: '🤕', label: 'தலைவலி', danger: false },
      { emoji: '🩸', label: 'இரத்தப்போக்கு', danger: true },
      { emoji: '😮‍💨', label: 'மூச்சு திணறல்', danger: true },
      { emoji: '🦵', label: 'கால் வீக்கம்', danger: false },
      { emoji: '👁️', label: 'மங்கலான பார்வை', danger: true },
      { emoji: '🔺', label: 'உயர் இரத்த அழுத்தம்', danger: true },
      { emoji: '😫', label: 'கடுமையான வயிற்று வலி', danger: true },
    ],
    checkBtn: 'அறிகுறிகளை சரிபார்',
    clearBtn: 'அழி',
    resultTitle: 'அறிகுறி மதிப்பீடு',
    dangerAlert: '🚨 அவசரம்: உடனடியாக உங்கள் மருத்துவரை அணுகவும் அல்லது 108 அழைக்கவும்!',
    mildAlert: '💡 லேசான அறிகுறிகள் கண்டறியப்பட்டன. ஓய்வெடுத்து, தண்ணீர் குடிக்கவும். மோசமாகினால் மருத்துவரை அணுகவும்.',
    noSymptoms: 'குறைந்தது ஒரு அறிகுறியை தேர்ந்தெடுக்கவும்.',
    selected: 'தேர்ந்தெடுக்கப்பட்டது',
    backBtn: 'பின்செல்',
    callDoc: 'மருத்துவரை அழை (108)',
  },
};

interface Props {
  language: string;
}

export default function SymptomScreen({ language }: Props) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isDanger, setIsDanger] = useState(false);

  const toggleSymptom = (idx: number) => {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    setResult(null);
  };

  const handleCheck = () => {
    if (selected.length === 0) {
      setResult(t.noSymptoms);
      setIsDanger(false);
      return;
    }
    const hasDanger = selected.some(i => t.symptoms[i].danger);
    if (hasDanger) {
      setResult(t.dangerAlert);
      setIsDanger(true);
      speak(t.dangerAlert, language);
    } else {
      setResult(t.mildAlert);
      setIsDanger(false);
      speak(t.mildAlert, language);
    }
  };

  return (
    <div className="fadeIn">
      <h1 className="screen-title">{t.title}</h1>
      <p style={{ margin: '-0.5rem 0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.subtitle}</p>

      {result && (
        <div className="fadeIn" style={{
          background: isDanger ? '#FFEBEE' : '#E8F5E9',
          border: `2px solid ${isDanger ? '#f44336' : '#4CAF50'}`,
          borderRadius: '1rem',
          padding: '1rem',
          marginBottom: '1rem',
          fontSize: '0.95rem',
          color: isDanger ? '#c62828' : '#2E7D32',
          fontWeight: 600,
          lineHeight: 1.5,
        }}>
          {result}
          {isDanger && (
            <a href="tel:108" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.75rem', background: '#f44336', color: 'white', padding: '0.7rem', borderRadius: '0.6rem', textDecoration: 'none', fontWeight: 700, gap: '0.4rem' }}>
              📞 {t.callDoc}
            </a>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {t.symptoms.map((sym, i) => (
          <button
            key={i}
            className={`symptom-btn${sym.danger && selected.includes(i) ? ' danger' : ''}`}
            onClick={() => toggleSymptom(i)}
            style={{
              background: selected.includes(i) ? (sym.danger ? '#FFEBEE' : 'hsl(336,72%,96%)') : 'white',
              borderColor: selected.includes(i) ? (sym.danger ? '#f44336' : 'hsl(336,72%,45%)') : 'hsl(340,20%,88%)',
              color: selected.includes(i) ? (sym.danger ? '#c62828' : 'hsl(336,72%,35%)') : 'hsl(340,15%,20%)',
            }}
          >
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{sym.emoji}</span>
            <span style={{ flex: 1 }}>{sym.label}</span>
            {selected.includes(i) && <span style={{ fontSize: '1rem' }}>✓</span>}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
        {selected.length > 0 && (
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setSelected([]); setResult(null); }}>
            {t.clearBtn}
          </button>
        )}
        <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleCheck}>
          {t.checkBtn} {selected.length > 0 && `(${selected.length})`}
        </button>
      </div>
    </div>
  );
}
