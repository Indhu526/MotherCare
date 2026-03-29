import React, { useState } from 'react';
import type { Lang, Tab } from '../App';

const tx = {
  en: {
    title: 'More Features',
    items: [
      { icon: '〰️', label: 'Pregnancy Exercises', key: 'exercises', active: true },
      { icon: '🩺', label: 'Symptom Checker', key: 'symptoms', active: false },
      { icon: '📋', label: 'Government Schemes', key: 'schemes', active: false },
      { icon: '👥', label: 'Emergency Contacts', key: 'contacts', active: false },
      { icon: '⚙️', label: 'Logout / Switch User', key: 'logout', active: false },
    ],
    exercisesTitle: 'Pregnancy Exercises',
    symptomsTitle: 'Symptom Checker',
    schemesTitle: 'Government Schemes',
    contactsTitle: 'Emergency Contacts',
    back: '← Back',
    exercises: [
      { name: 'Walking', duration: '20–30 min/day', emoji: '🚶‍♀️' },
      { name: 'Prenatal Yoga', duration: '15–20 min/day', emoji: '🧘' },
      { name: 'Kegel Exercises', duration: '3 sets × 10 reps', emoji: '💪' },
      { name: 'Breathing Exercises', duration: '5–10 min/day', emoji: '😮‍💨' },
      { name: 'Pelvic Tilts', duration: '10 reps/day', emoji: '🤸‍♀️' },
      { name: 'Swimming', duration: '20 min, 3x/week', emoji: '🏊‍♀️' },
    ],
    symptoms: [
      { emoji: '🤒', label: 'Fever', danger: false },
      { emoji: '🤢', label: 'Nausea / Vomiting', danger: false },
      { emoji: '💔', label: 'Chest Pain', danger: true },
      { emoji: '🤕', label: 'Headache', danger: false },
      { emoji: '🩸', label: 'Bleeding', danger: true },
      { emoji: '😮‍💨', label: 'Shortness of Breath', danger: true },
      { emoji: '🦵', label: 'Leg Swelling', danger: false },
      { emoji: '👁️', label: 'Blurred Vision', danger: true },
      { emoji: '😫', label: 'Severe Abdominal Pain', danger: true },
    ],
    dangerAlert: '🚨 URGENT: Please contact your doctor or call 108 immediately!',
    mildAlert: '💡 Mild symptoms. Rest, hydrate, and monitor. See a doctor if it worsens.',
    checkBtn: 'Check Symptoms',
    clearBtn: 'Clear',
    schemes: [
      { name: 'Dr. Muthulakshmi Maternity Scheme', amount: '₹18,000', desc: 'Financial assistance for pregnant women in TN', eligible: 'Family income < ₹72,000/year', how: 'Visit nearest PHC or tn.gov.in' },
      { name: 'Pradhan Mantri Matru Vandana Yojana', amount: '₹5,000', desc: 'Central government maternity benefit', eligible: 'First live birth, registered at ASHA/ANM', how: 'Register at Anganwadi or Health Centre' },
      { name: 'Janani Suraksha Yojana (JSY)', amount: '₹700–1,400', desc: 'Cash incentive for institutional delivery', eligible: 'BPL pregnant women at govt hospitals', how: 'Enroll through ASHA worker' },
    ],
    contacts: [
      { name: 'Emergency Ambulance', num: '108', emoji: '🚑' },
      { name: 'Women Helpline', num: '181', emoji: '👩' },
      { name: 'Child Helpline', num: '1098', emoji: '👶' },
      { name: 'Health Helpline', num: '104', emoji: '🏥' },
    ],
    amount: 'Amount',
    eligible: 'Eligible',
    how: 'How to Apply',
  },
  ta: {
    title: 'மேலும் அம்சங்கள்',
    items: [
      { icon: '〰️', label: 'கர்ப்பகால உடற்பயிற்சி', key: 'exercises', active: true },
      { icon: '🩺', label: 'அறிகுறி சரிபார்ப்பு', key: 'symptoms', active: false },
      { icon: '📋', label: 'அரசு திட்டங்கள்', key: 'schemes', active: false },
      { icon: '👥', label: 'அவசர தொடர்புகள்', key: 'contacts', active: false },
      { icon: '⚙️', label: 'வெளியேறு / பயனர் மாற்று', key: 'logout', active: false },
    ],
    exercisesTitle: 'கர்ப்பகால உடற்பயிற்சிகள்',
    symptomsTitle: 'அறிகுறி சரிபார்ப்பு',
    schemesTitle: 'அரசு திட்டங்கள்',
    contactsTitle: 'அவசர தொடர்புகள்',
    back: '← பின்செல்',
    exercises: [
      { name: 'நடை பயிற்சி', duration: '20–30 நிமிடம்/நாள்', emoji: '🚶‍♀️' },
      { name: 'கர்ப்பகால யோகா', duration: '15–20 நிமிடம்/நாள்', emoji: '🧘' },
      { name: 'கெகல் பயிற்சி', duration: '3 செட் × 10 முறை', emoji: '💪' },
      { name: 'சுவாச பயிற்சி', duration: '5–10 நிமிடம்/நாள்', emoji: '😮‍💨' },
      { name: 'பெல்விக் டில்ட்ஸ்', duration: '10 முறை/நாள்', emoji: '🤸‍♀️' },
      { name: 'நீச்சல்', duration: '20 நிமிடம், வாரம் 3 முறை', emoji: '🏊‍♀️' },
    ],
    symptoms: [
      { emoji: '🤒', label: 'காய்ச்சல்', danger: false },
      { emoji: '🤢', label: 'குமட்டல் / வாந்தி', danger: false },
      { emoji: '💔', label: 'மார்பு வலி', danger: true },
      { emoji: '🤕', label: 'தலைவலி', danger: false },
      { emoji: '🩸', label: 'இரத்தப்போக்கு', danger: true },
      { emoji: '😮‍💨', label: 'மூச்சு திணறல்', danger: true },
      { emoji: '🦵', label: 'கால் வீக்கம்', danger: false },
      { emoji: '👁️', label: 'மங்கலான பார்வை', danger: true },
      { emoji: '😫', label: 'கடுமையான வயிற்று வலி', danger: true },
    ],
    dangerAlert: '🚨 அவசரம்: உடனடியாக மருத்துவரை அணுகவும் அல்லது 108 அழைக்கவும்!',
    mildAlert: '💡 லேசான அறிகுறிகள். ஓய்வு, தண்ணீர் குடிக்கவும். மோசமாகினால் மருத்துவரை அணுகவும்.',
    checkBtn: 'சரிபார்',
    clearBtn: 'அழி',
    schemes: [
      { name: 'டாக்டர் முத்துலட்சுமி மகப்பேறு திட்டம்', amount: '₹18,000', desc: 'தமிழ்நாட்டில் கர்ப்பிணிகளுக்கு நிதி உதவி', eligible: 'வருமானம் ₹72,000-க்கும் குறைவாக', how: 'அருகிலுள்ள PHC அல்லது tn.gov.in' },
      { name: 'PM மாத்ரு வந்தனா யோஜனா', amount: '₹5,000', desc: 'மத்திய அரசின் மகப்பேறு நலத்திட்டம்', eligible: 'முதல் குழந்தை, ASHA/ANM-ல் பதிவு', how: 'அங்கன்வாடி அல்லது சுகாதார மையத்தில்' },
      { name: 'ஜனனி சுரட்சா யோஜனா', amount: '₹700–1,400', desc: 'நிறுவன பிரசவத்திற்கு பண ஊக்கத்தொகை', eligible: 'BPL கர்ப்பிணிகள், அரசு மருத்துவமனை', how: 'ASHA தொழிலாளி மூலம்' },
    ],
    contacts: [
      { name: 'அவசர ஆம்புலன்ஸ்', num: '108', emoji: '🚑' },
      { name: 'பெண்கள் உதவி', num: '181', emoji: '👩' },
      { name: 'குழந்தை உதவி', num: '1098', emoji: '👶' },
      { name: 'சுகாதார உதவி', num: '104', emoji: '🏥' },
    ],
    amount: 'தொகை',
    eligible: 'தகுதி',
    how: 'விண்ணப்பிப்பது எப்படி',
  },
};

interface Props { lang: Lang; setTab: (t: Tab) => void; patientData?: Record<string, string>; }

export default function MoreScreen({ lang, setTab, patientData }: Props) {
  const t = tx[lang] ?? tx.en;
  const [view, setView] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleItem = (key: string) => {
    if (key === 'logout') { alert('Logged out'); return; }
    setView(key);
    setSelected([]);
    setResult(null);
  };

  const Back = () => (
    <button onClick={() => setView(null)} style={{ background: 'none', border: '1.5px solid #e91e63', color: '#e91e63', borderRadius: '2rem', padding: '0.4rem 0.9rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1rem' }}>
      {t.back}
    </button>
  );

  // Exercises view
  if (view === 'exercises') {
    return (
      <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
        <Back />
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 1rem' }}>{t.exercisesTitle}</h1>
        {t.exercises.map((ex, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{ex.emoji}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{ex.name}</p>
              <p style={{ margin: '0.1rem 0 0', fontSize: '0.8rem', color: '#b91c1c', fontWeight: 600 }}>⏱ {ex.duration}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Symptoms view
  if (view === 'symptoms') {
    const toggle = (i: number) => { setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]); setResult(null); };
    const check = () => {
      if (!selected.length) return;
      const danger = selected.some(i => t.symptoms[i].danger);
      setResult(danger ? t.dangerAlert : t.mildAlert);
    };
    return (
      <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
        <Back />
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 0.75rem' }}>{t.symptomsTitle}</h1>
        {result && (
          <div style={{ background: result.includes('🚨') ? '#fee2e2' : '#e8f5e9', border: `2px solid ${result.includes('🚨') ? '#b91c1c' : '#4CAF50'}`, borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: result.includes('🚨') ? '#7f1d1d' : '#1b5e20', fontWeight: 600, lineHeight: 1.45 }}>
            {result}
            {result.includes('🚨') && <a href="tel:108" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.65rem', background: '#b91c1c', color: 'white', padding: '0.65rem', borderRadius: '0.6rem', textDecoration: 'none', fontWeight: 700, gap: '0.4rem' }}>📞 Call 108</a>}
          </div>
        )}
        {t.symptoms.map((sym, i) => (
          <button key={i} className={`symptom-btn${selected.includes(i) ? ' selected' : ''}`} onClick={() => toggle(i)}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{sym.emoji}</span>
            <span style={{ flex: 1 }}>{sym.label}</span>
            {selected.includes(i) && <span>✓</span>}
          </button>
        ))}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {selected.length > 0 && <button onClick={() => { setSelected([]); setResult(null); }} style={{ flex: 1, padding: '0.85rem', borderRadius: '0.75rem', border: '1.5px solid #b91c1c', background: 'white', color: '#b91c1c', fontWeight: 700, cursor: 'pointer' }}>{t.clearBtn}</button>}
          <button onClick={check} style={{ flex: 2, padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: '#b91c1c', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>{t.checkBtn}</button>
        </div>
      </div>
    );
  }

  // Schemes view
  if (view === 'schemes') {
    return (
      <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
        <Back />
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 1rem' }}>{t.schemesTitle}</h1>
        {t.schemes.map((s, i) => (
          <div key={i} className="card" style={{ borderLeft: '4px solid #b91c1c', marginBottom: '0.75rem' }}>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, fontSize: '0.95rem', color: '#7f1d1d' }}>{s.name}</p>
            <span style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: '2rem', padding: '0.15rem 0.65rem', fontSize: '0.82rem', fontWeight: 700 }}>💰 {t.amount}: {s.amount}</span>
            <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', color: '#444' }}>{s.desc}</p>
            <div style={{ background: '#f0f8ff', borderRadius: '0.5rem', padding: '0.45rem 0.65rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1565c0' }}>✅ {t.eligible}: </span>
              <span style={{ fontSize: '0.78rem', color: '#444' }}>{s.eligible}</span>
            </div>
            <div style={{ background: '#e8f5e9', borderRadius: '0.5rem', padding: '0.45rem 0.65rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2e7d32' }}>📋 {t.how}: </span>
              <span style={{ fontSize: '0.78rem', color: '#444' }}>{s.how}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Contacts view
  if (view === 'contacts') {
    const husbandName = patientData?.husband || (lang === 'ta' ? 'கணவர்' : 'Husband');
    const husbandNum = patientData?.emergency || (lang === 'ta' ? 'பதிவு செய்யப்படவில்லை' : 'Not registered');
    const dynamicContacts = [
      { name: lang === 'ta' ? 'அவசர ஆம்புலன்ஸ்' : 'Emergency Ambulance', num: '108', emoji: '🚑', bg: '#fee2e2' },
      { name: `${husbandName} (${lang === 'ta' ? 'கணவர்' : 'Husband'})`, num: husbandNum, emoji: '👨', bg: '#e8f5e9' },
      { name: lang === 'ta' ? 'ASHA / சுகாதார ஊழியர்' : 'ASHA / Health Staff', num: '9876543210', emoji: '👩‍⚕️', bg: '#e3f2fd' },
      { name: lang === 'ta' ? 'சுகாதார உதவி' : 'Health Helpline', num: '104', emoji: '🏥', bg: '#fce4ec' },
    ];
    return (
      <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
        <Back />
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 1rem' }}>{t.contactsTitle}</h1>
        {dynamicContacts.map((c, i) => (
          <a key={i} href={`tel:${c.num}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '0.6rem', cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.92rem', color: '#1a1a1a' }}>{c.name}</p>
              <p style={{ margin: '0.15rem 0 0', fontWeight: 800, fontSize: '1.05rem', color: '#b91c1c' }}>{c.num}</p>
            </div>
            <span style={{ fontSize: '1.1rem' }}>📞</span>
          </a>
        ))}
      </div>
    );
  }

  // Main menu
  return (
    <div className="fadeIn" style={{ padding: '1.25rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 1rem' }}>{t.title}</h1>
      {t.items.map((item, i) => (
        <button
          key={item.key}
          className="more-item"
          onClick={() => handleItem(item.key)}
          style={{
            background: i === 0 ? '#b91c1c' : i === 1 ? '#fce4ec' : i === 2 ? '#fdf6ee' : 'white',
            color: i === 0 ? 'white' : '#1a1a1a',
            border: 'none',
          }}
        >
          <span style={{ fontSize: '1.2rem', color: i === 0 ? 'white' : (i === 1 ? '#e91e63' : '#1565c0') }}>{item.icon}</span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: i === 0 ? 'white' : '#1a1a1a' }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
