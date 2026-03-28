import React, { useState } from 'react';
import type { Lang } from '../App';

const tx = {
  en: {
    title: 'Tell Us About You',
    sub: 'We\'ll personalize your care plan based on your details',
    step1: 'Personal Details',
    step2: 'Pregnancy Info',
    nameLbl: 'Full Name',
    namePh: 'Enter your full name',
    ageLbl: 'Age',
    agePh: 'Your age',
    phoneLbl: 'Phone Number',
    phonePh: '10-digit mobile number',
    sexLbl: 'Sex',
    sexF: 'Female',
    sexM: 'Male',
    sexO: 'Other',
    next: 'Continue →',
    back: '← Back',
    weeksLbl: 'Weeks Pregnant',
    weeksPh: 'e.g. 14',
    locationLbl: 'Village / Block',
    locationPh: 'Your village or block name',
    bloodLbl: 'Blood Group',
    husbandLbl: 'Husband\'s Name',
    husbandPh: 'Husband\'s full name',
    emergencyLbl: 'Emergency Contact',
    emergencyPh: '10-digit number',
    submit: 'Start My Journey 🌸',
    required: '* Required fields',
    trimester: (w: number) => w <= 13 ? 'Trimester 1' : w <= 26 ? 'Trimester 2' : 'Trimester 3',
    weekNote: (w: number) => `${w} weeks • ${w <= 13 ? 'First' : w <= 26 ? 'Second' : 'Third'} Trimester`,
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  ta: {
    title: 'உங்களைப் பற்றி சொல்லுங்கள்',
    sub: 'உங்கள் விவரங்களின் அடிப்படையில் உங்கள் பராமரிப்பு திட்டத்தை தயாரிப்போம்',
    step1: 'தனிப்பட்ட விவரங்கள்',
    step2: 'கர்ப்பகால தகவல்',
    nameLbl: 'முழு பெயர்',
    namePh: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    ageLbl: 'வயது',
    agePh: 'உங்கள் வயது',
    phoneLbl: 'தொலைபேசி எண்',
    phonePh: '10-இலக்க மொபைல் எண்',
    sexLbl: 'பாலினம்',
    sexF: 'பெண்',
    sexM: 'ஆண்',
    sexO: 'மற்றவை',
    next: 'தொடர்க →',
    back: '← பின்செல்',
    weeksLbl: 'கர்ப்ப வாரங்கள்',
    weeksPh: 'எ.கா. 14',
    locationLbl: 'கிராமம் / பிளாக்',
    locationPh: 'உங்கள் கிராமம் அல்லது பிளாக் பெயர்',
    bloodLbl: 'இரத்த வகை',
    husbandLbl: 'கணவரின் பெயர்',
    husbandPh: 'கணவரின் முழு பெயர்',
    emergencyLbl: 'அவசர தொடர்பு',
    emergencyPh: '10-இலக்க எண்',
    submit: 'என் பயணத்தை தொடங்கு 🌸',
    required: '* கட்டாய புலங்கள்',
    trimester: (w: number) => w <= 13 ? 'திமஸ்டர் 1' : w <= 26 ? 'திமஸ்டர் 2' : 'திமஸ்டர் 3',
    weekNote: (w: number) => `${w} வாரங்கள் • ${w <= 13 ? 'முதல்' : w <= 26 ? 'இரண்டாம்' : 'மூன்றாம்'} திமஸ்டர்`,
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
};

interface Props {
  lang: Lang;
  onBack: () => void;
  onDone: (data: Record<string, string>) => void;
}

export default function PatientFormScreen({ lang, onBack, onDone }: Props) {
  const t = tx[lang] ?? tx.en;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', age: '', phone: '', sex: 'Female', weeks: '', location: '', blood: '', husband: '', emergency: '' });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const weeks = parseInt(form.weeks) || 0;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1rem',
    border: '1.5px solid #e0e0e0',
    borderRadius: '0.75rem',
    fontSize: '0.95rem',
    outline: 'none',
    background: '#fafafa',
    color: '#1a1a1a',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#666',
    marginBottom: '0.35rem',
    marginTop: '0.9rem',
  };

  const step1Valid = form.name.trim() && form.age && form.phone.length >= 10;
  const step2Valid = form.weeks && parseInt(form.weeks) >= 1 && parseInt(form.weeks) <= 42;

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: '#fef6f9' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #b91c1c, #e91e63)', padding: '2.5rem 1.5rem 4rem' }}>
        <button onClick={step === 1 ? onBack : () => setStep(1)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: 36, height: 36, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{t.title}</h2>
        <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{t.sub}</p>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: '#b91c1c' }}>1</div>
            <span style={{ fontSize: '0.78rem', color: 'white', fontWeight: step === 1 ? 700 : 400 }}>{t.step1}</span>
          </div>
          <div style={{ flex: 1, height: 2, background: step === 2 ? 'white' : 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === 2 ? 'white' : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: step === 2 ? '#b91c1c' : 'rgba(255,255,255,0.8)' }}>2</div>
            <span style={{ fontSize: '0.78rem', color: 'white', fontWeight: step === 2 ? 700 : 400 }}>{t.step2}</span>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div style={{ background: 'white', borderRadius: '2rem 2rem 0 0', flex: 1, padding: '1.75rem 1.5rem 2rem', marginTop: '-2rem', overflowY: 'auto' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#e91e63', fontWeight: 600 }}>{t.required}</p>

        {step === 1 ? (
          <>
            <label style={labelStyle}>{t.nameLbl} *</label>
            <input style={inputStyle} placeholder={t.namePh} value={form.name} onChange={e => set('name', e.target.value)} />

            <label style={labelStyle}>{t.ageLbl} *</label>
            <input style={inputStyle} type="number" placeholder={t.agePh} min="14" max="55" value={form.age} onChange={e => set('age', e.target.value)} />

            <label style={labelStyle}>{t.phoneLbl} *</label>
            <div style={{ display: 'flex', border: '1.5px solid #e0e0e0', borderRadius: '0.75rem', overflow: 'hidden', background: '#fafafa' }}>
              <span style={{ padding: '0 0.75rem', borderRight: '1.5px solid #e0e0e0', color: '#888', fontSize: '0.9rem', background: '#f5f5f5', display: 'flex', alignItems: 'center' }}>🇮🇳 +91</span>
              <input type="tel" maxLength={10} placeholder={t.phonePh} value={form.phone} onChange={e => set('phone', e.target.value)} style={{ flex: 1, border: 'none', padding: '0.9rem 0.75rem', fontSize: '0.95rem', outline: 'none', background: 'transparent' }} />
            </div>

            <label style={labelStyle}>{t.sexLbl} *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[t.sexF, t.sexM, t.sexO].map(s => (
                <button key={s} onClick={() => set('sex', s)} style={{ flex: 1, padding: '0.8rem', borderRadius: '0.75rem', border: `2px solid ${form.sex === s ? '#e91e63' : '#e0e0e0'}`, background: form.sex === s ? '#fce4ec' : 'white', color: form.sex === s ? '#b91c1c' : '#888', fontWeight: form.sex === s ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => step1Valid && setStep(2)}
              style={{ width: '100%', padding: '1rem', borderRadius: '0.85rem', border: 'none', background: step1Valid ? 'linear-gradient(135deg, #b91c1c, #e91e63)' : '#f0f0f0', color: step1Valid ? 'white' : '#aaa', fontSize: '1rem', fontWeight: 800, cursor: step1Valid ? 'pointer' : 'not-allowed', marginTop: '1.5rem', boxShadow: step1Valid ? '0 6px 20px rgba(185,28,28,0.25)' : 'none' }}
            >
              {t.next}
            </button>
          </>
        ) : (
          <>
            <label style={labelStyle}>{t.weeksLbl} *</label>
            <input style={inputStyle} type="number" placeholder={t.weeksPh} min="1" max="42" value={form.weeks} onChange={e => set('weeks', e.target.value)} />
            {weeks >= 1 && weeks <= 42 && (
              <div style={{ background: '#fce4ec', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginTop: '0.35rem', fontSize: '0.82rem', color: '#b91c1c', fontWeight: 600 }}>
                📍 {t.weekNote(weeks)}
              </div>
            )}

            <label style={labelStyle}>{t.locationLbl}</label>
            <input style={inputStyle} placeholder={t.locationPh} value={form.location} onChange={e => set('location', e.target.value)} />

            <label style={labelStyle}>{t.bloodLbl}</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.1rem' }}>
              {t.bloodGroups.map(b => (
                <button key={b} onClick={() => set('blood', b)} style={{ padding: '0.5rem 0.8rem', borderRadius: '0.5rem', border: `2px solid ${form.blood === b ? '#e91e63' : '#e0e0e0'}`, background: form.blood === b ? '#fce4ec' : 'white', color: form.blood === b ? '#b91c1c' : '#888', fontWeight: form.blood === b ? 700 : 400, fontSize: '0.85rem', cursor: 'pointer' }}>
                  {b}
                </button>
              ))}
            </div>

            <label style={labelStyle}>{t.husbandLbl}</label>
            <input style={inputStyle} placeholder={t.husbandPh} value={form.husband} onChange={e => set('husband', e.target.value)} />

            <label style={labelStyle}>{t.emergencyLbl}</label>
            <div style={{ display: 'flex', border: '1.5px solid #e0e0e0', borderRadius: '0.75rem', overflow: 'hidden', background: '#fafafa' }}>
              <span style={{ padding: '0 0.75rem', borderRight: '1.5px solid #e0e0e0', color: '#888', fontSize: '0.9rem', background: '#f5f5f5', display: 'flex', alignItems: 'center' }}>📞</span>
              <input type="tel" maxLength={10} placeholder={t.emergencyPh} value={form.emergency} onChange={e => set('emergency', e.target.value)} style={{ flex: 1, border: 'none', padding: '0.9rem 0.75rem', fontSize: '0.95rem', outline: 'none', background: 'transparent' }} />
            </div>

            <button
              onClick={() => step2Valid && onDone(form)}
              style={{ width: '100%', padding: '1rem', borderRadius: '0.85rem', border: 'none', background: step2Valid ? 'linear-gradient(135deg, #b91c1c, #e91e63)' : '#f0f0f0', color: step2Valid ? 'white' : '#aaa', fontSize: '1rem', fontWeight: 800, cursor: step2Valid ? 'pointer' : 'not-allowed', marginTop: '1.5rem', boxShadow: step2Valid ? '0 6px 20px rgba(185,28,28,0.25)' : 'none' }}
            >
              {t.submit}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
