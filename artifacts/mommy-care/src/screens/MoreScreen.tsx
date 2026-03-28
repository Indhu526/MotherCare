import React, { useState, useEffect, useRef } from 'react';
import { speak } from '../utils/speak';

const translations = {
  en: {
    title: '🌸 More',
    backBtn: '← Back',
    schemesBtn: '🏥 Government Schemes',
    ammaChatBtn: 'Chat with AI Amma',
    nutritionBtn: '🥗 Nutrition Guide',
    exerciseBtn: '🧘 Safe Exercises',
    helplineBtn: '📞 Helplines',
    typeMsg: 'Type your message...',
    send: 'Send',
    ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',
    ammaDefault: 'I am here for you. Please eat healthy food and take rest. If you feel unwell, contact a doctor.',
    ammaMed: 'Please take rest and drink water. If it continues, consult your doctor.',
    schemesTitle: '🏥 Government Schemes',
    schemesList: [
      {
        name: 'Dr. Muthulakshmi Maternity Benefit Scheme',
        amount: '₹18,000',
        desc: 'Financial assistance for pregnant women in Tamil Nadu',
        eligible: 'All pregnant women with family income < ₹72,000/year',
        apply: 'Visit nearest PHC or apply online at tn.gov.in',
      },
      {
        name: 'Pradhan Mantri Matru Vandana Yojana',
        amount: '₹5,000',
        desc: 'Central government maternity benefit scheme',
        eligible: 'First live birth, registered at ASHA/ANM',
        apply: 'Register at Anganwadi or Health Centre',
      },
      {
        name: 'JSY – Janani Suraksha Yojana',
        amount: '₹700–1,400',
        desc: 'Cash incentive for institutional delivery',
        eligible: 'BPL pregnant women delivering at govt hospitals',
        apply: 'Enroll through ASHA worker',
      },
    ],
    nutritionTitle: '🥗 Nutrition Guide',
    nutritionItems: [
      { food: 'Lentils (Dal)', nutrient: 'Iron + Protein', emoji: '🫘' },
      { food: 'Spinach (Keerai)', nutrient: 'Folate + Iron', emoji: '🥬' },
      { food: 'Milk & Curd', nutrient: 'Calcium + Protein', emoji: '🥛' },
      { food: 'Eggs', nutrient: 'Protein + Choline', emoji: '🥚' },
      { food: 'Banana', nutrient: 'Potassium + B6', emoji: '🍌' },
      { food: 'Sesame (Til)', nutrient: 'Calcium + Iron', emoji: '🌾' },
    ],
    exerciseTitle: '🧘 Safe Exercises',
    exercises: [
      { name: 'Walking', duration: '20–30 min/day', emoji: '🚶‍♀️' },
      { name: 'Prenatal Yoga', duration: '15–20 min/day', emoji: '🧘' },
      { name: 'Kegel Exercises', duration: '3 sets x 10 reps', emoji: '💪' },
      { name: 'Breathing Exercises', duration: '5–10 min/day', emoji: '😮‍💨' },
    ],
    helplineTitle: '📞 Helplines',
    helplines: [
      { name: 'Emergency', num: '108', emoji: '🚑' },
      { name: 'Women Helpline', num: '181', emoji: '👩' },
      { name: 'Child Helpline', num: '1098', emoji: '👶' },
      { name: 'Health Helpline', num: '104', emoji: '🏥' },
    ],
    amount: 'Amount',
    eligible: 'Eligible',
    apply: 'How to Apply',
  },
  ta: {
    title: '🌸 மேலும்',
    backBtn: '← பின்செல்',
    schemesBtn: '🏥 அரசு திட்டங்கள்',
    ammaChatBtn: 'AI அம்மாவுடன் பேசுங்கள்',
    nutritionBtn: '🥗 ஊட்டச்சத்து வழிகாட்டி',
    exerciseBtn: '🧘 பாதுகாப்பான உடற்பயிற்சிகள்',
    helplineBtn: '📞 உதவி எண்கள்',
    typeMsg: 'உங்கள் செய்தியை தட்டச்சு செய்க...',
    send: 'அனுப்பு',
    ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உங்கள் உடல்நிலை எப்படி உள்ளது? ❤️',
    ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவைச் சாப்பிட்டு ஓய்வெடுக்கவும்.',
    ammaMed: 'கொஞ்சம் ஓய்வு எடுத்துக்கொள்ளுங்கள், தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.',
    schemesTitle: '🏥 அரசு திட்டங்கள்',
    schemesList: [
      {
        name: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு திட்டம்',
        amount: '₹18,000',
        desc: 'தமிழ்நாட்டில் கர்ப்பிணி பெண்களுக்கு நிதி உதவி',
        eligible: 'குடும்ப வருமானம் ₹72,000-க்கும் குறைவாக உள்ள அனைத்து கர்ப்பிணிகளும்',
        apply: 'அருகிலுள்ள PHC-ஐ அணுகவும் அல்லது tn.gov.in-ல் ஆன்லைனில் விண்ணப்பிக்கவும்',
      },
      {
        name: 'பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா',
        amount: '₹5,000',
        desc: 'மத்திய அரசின் மகப்பேறு நலத்திட்டம்',
        eligible: 'முதல் குழந்தை, ASHA/ANM-ல் பதிவு செய்யப்பட்டவர்',
        apply: 'அங்கன்வாடி அல்லது சுகாதார மையத்தில் பதிவு செய்யவும்',
      },
      {
        name: 'JSY – ஜனனி சுரக்ஷா யோஜனா',
        amount: '₹700–1,400',
        desc: 'நிறுவன பிரசவத்திற்கு பண ஊக்கத்தொகை',
        eligible: 'அரசு மருத்துவமனைகளில் பிரசவிக்கும் BPL கர்ப்பிணிகள்',
        apply: 'ASHA தொழிலாளி மூலம் சேர்க்கப்படவும்',
      },
    ],
    nutritionTitle: '🥗 ஊட்டச்சத்து வழிகாட்டி',
    nutritionItems: [
      { food: 'பருப்பு', nutrient: 'இரும்பு + புரதம்', emoji: '🫘' },
      { food: 'கீரை', nutrient: 'ஃபோலேட் + இரும்பு', emoji: '🥬' },
      { food: 'பால் & தயிர்', nutrient: 'கால்சியம் + புரதம்', emoji: '🥛' },
      { food: 'முட்டை', nutrient: 'புரதம் + கோலின்', emoji: '🥚' },
      { food: 'வாழைப்பழம்', nutrient: 'பொட்டாசியம் + B6', emoji: '🍌' },
      { food: 'எள்', nutrient: 'கால்சியம் + இரும்பு', emoji: '🌾' },
    ],
    exerciseTitle: '🧘 பாதுகாப்பான உடற்பயிற்சிகள்',
    exercises: [
      { name: 'நடை பயிற்சி', duration: '20–30 நிமிடம்/நாள்', emoji: '🚶‍♀️' },
      { name: 'கர்ப்பகால யோகா', duration: '15–20 நிமிடம்/நாள்', emoji: '🧘' },
      { name: 'கெகல் பயிற்சி', duration: '3 செட் x 10 முறை', emoji: '💪' },
      { name: 'சுவாச பயிற்சி', duration: '5–10 நிமிடம்/நாள்', emoji: '😮‍💨' },
    ],
    helplineTitle: '📞 உதவி எண்கள்',
    helplines: [
      { name: 'அவசர உதவி', num: '108', emoji: '🚑' },
      { name: 'பெண்கள் உதவி', num: '181', emoji: '👩' },
      { name: 'குழந்தை உதவி', num: '1098', emoji: '👶' },
      { name: 'சுகாதார உதவி', num: '104', emoji: '🏥' },
    ],
    amount: 'தொகை',
    eligible: 'தகுதி',
    apply: 'விண்ணப்பிப்பது எப்படி',
  },
};

interface Props {
  language: string;
}

interface ChatMsg {
  sender: 'user' | 'amma';
  text: string;
}

type View = 'menu' | 'amma' | 'schemes' | 'nutrition' | 'exercise' | 'helplines';

export default function MoreScreen({ language }: Props) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [view, setView] = useState<View>('menu');
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendAmma = () => {
    if (!chatInput.trim()) return;
    const newMsgs: ChatMsg[] = [...chatMsgs, { sender: 'user', text: chatInput }];
    setChatMsgs(newMsgs);
    setChatInput('');
    const lower = chatInput.toLowerCase();
    let response = t.ammaDefault;
    if (lower.includes('headache') || lower.includes('pain') || lower.includes('fever') ||
        lower.includes('தலைவலி') || lower.includes('வலி')) {
      response = t.ammaMed;
    }
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
      speak(response, language);
    }, 800);
  };

  useEffect(() => {
    if (view === 'amma' && chatMsgs.length === 0) {
      setChatMsgs([{ sender: 'amma', text: t.ammaWelcome }]);
      speak(t.ammaWelcome, language);
    }
  }, [view]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  // AI Amma chat view
  if (view === 'amma') {
    return (
      <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexShrink: 0, marginBottom: '0.75rem' }}>
          <button onClick={() => setView('menu')} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '0.75rem' }}>{t.backBtn}</button>
          <h1 className="screen-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 0 }}>
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

  // Schemes view
  if (view === 'schemes') {
    return (
      <div className="fadeIn">
        <button onClick={() => setView('menu')} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '1rem' }}>{t.backBtn}</button>
        <h1 className="screen-title">{t.schemesTitle}</h1>
        {t.schemesList.map((scheme, i) => (
          <div key={i} className="card" style={{ borderLeft: '4px solid hsl(336,72%,45%)' }}>
            <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{scheme.name}</h3>
            <div style={{ display: 'inline-block', background: 'hsl(336,72%,92%)', color: 'hsl(336,72%,35%)', borderRadius: '2rem', padding: '0.2rem 0.75rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              💰 {t.amount}: {scheme.amount}
            </div>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.4 }}>{scheme.desc}</p>
            <div style={{ background: '#F8FBFF', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1976D2' }}>✅ {t.eligible}: </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>{scheme.eligible}</span>
            </div>
            <div style={{ background: '#E8F5E9', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E7D32' }}>📋 {t.apply}: </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>{scheme.apply}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Nutrition view
  if (view === 'nutrition') {
    return (
      <div className="fadeIn">
        <button onClick={() => setView('menu')} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '1rem' }}>{t.backBtn}</button>
        <h1 className="screen-title">{t.nutritionTitle}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {t.nutritionItems.map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '1rem 0.75rem', margin: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{item.emoji}</div>
              <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.food}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'hsl(336,72%,45%)', fontWeight: 600 }}>{item.nutrient}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Exercise view
  if (view === 'exercise') {
    return (
      <div className="fadeIn">
        <button onClick={() => setView('menu')} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '1rem' }}>{t.backBtn}</button>
        <h1 className="screen-title">{t.exerciseTitle}</h1>
        {t.exercises.map((ex, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>{ex.emoji}</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>{ex.name}</p>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'hsl(336,72%,45%)', fontWeight: 600 }}>⏱ {ex.duration}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Helplines view
  if (view === 'helplines') {
    return (
      <div className="fadeIn">
        <button onClick={() => setView('menu')} className="btn btn-outline" style={{ width: 'auto', padding: '0.6rem 1rem', marginBottom: '1rem' }}>{t.backBtn}</button>
        <h1 className="screen-title">{t.helplineTitle}</h1>
        {t.helplines.map((h, i) => (
          <a key={i} href={`tel:${h.num}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ background: 'hsl(336,72%,92%)', borderRadius: '0.75rem', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{h.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)' }}>{h.name}</p>
              <p style={{ margin: '0.15rem 0 0', fontSize: '1.1rem', color: 'hsl(336,72%,45%)', fontWeight: 700 }}>{h.num}</p>
            </div>
            <span style={{ fontSize: '1.2rem' }}>📞</span>
          </a>
        ))}
      </div>
    );
  }

  // Main menu
  return (
    <div className="fadeIn">
      <h1 className="screen-title">{t.title}</h1>

      <button className="btn" onClick={() => setView('amma')} style={{ background: 'var(--primary-dark)', color: 'white', justifyContent: 'flex-start', border: 'none', borderRadius: '1rem', boxShadow: '0 6px 16px rgba(194,24,91,0.3)', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.6rem' }}>👩‍⚕️</span> {t.ammaChatBtn}
      </button>

      {[
        { key: 'schemes' as View, label: t.schemesBtn },
        { key: 'nutrition' as View, label: t.nutritionBtn },
        { key: 'exercise' as View, label: t.exerciseBtn },
        { key: 'helplines' as View, label: t.helplineBtn },
      ].map(item => (
        <button key={item.key} className="btn btn-outline" onClick={() => setView(item.key)} style={{ justifyContent: 'flex-start', marginBottom: '0.6rem', fontWeight: 600, fontSize: '1rem' }}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
