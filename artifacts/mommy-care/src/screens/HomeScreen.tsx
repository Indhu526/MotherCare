import React, { useState } from 'react';
import { speak } from '../utils/speak';
import type { Tab, Lang } from '../App';

const tx = {
  en: {
    hello: 'Hello,', name: 'malar', location: 'Village Block A',
    tapListen: 'Tap to Listen',
    listenText: 'Hello! Today take your iron supplement and drink 8 glasses of water.',
    reminders: "Today's Reminders",
    ironSupp: 'Iron Supplement', ironDone: 'Done', ironPending: 'Take now',
    hydration: 'Hydration', hydrationDesc: '0/8 Glasses',
    nextCheckup: 'Next Checkup', checkupDate: 'Apr 5, 2026',
    viewCalendar: '📅 View ANC Checkup Calendar',
    pregnancyUpdate: 'Pregnancy Update', trimester: 'Trimester 2',
    week: 'Week 14', weightGain: '+2kg',
    banner: 'HEALTHY MOTHER • HEALTHY BABY ♥',
    langBtn: '🌐 தமிழ்',
    calTitle: 'ANC Checkup Schedule',
    calClose: '✕ Close',
    calDue: 'Due Date (Est.)',
    visits: [
      { week: 8, label: 'First Antenatal Visit', done: true, tests: 'Blood test, BP, Weight' },
      { week: 12, label: 'Nuchal Scan + Blood', done: true, tests: 'Ultrasound, Down syndrome screen' },
      { week: 16, label: 'Mid-Pregnancy Check', done: true, tests: 'BP, Weight, Urine test' },
      { week: 20, label: 'Anomaly Scan', done: false, tests: 'Fetal anatomy ultrasound' },
      { week: 24, label: 'Glucose Screening', done: false, tests: 'GDM test, CBC, Urine' },
      { week: 28, label: 'Third Trimester Start', done: false, tests: 'BP, Fetal growth, Iron levels' },
      { week: 32, label: 'Growth Scan', done: false, tests: 'Ultrasound, Fetal position' },
      { week: 36, label: 'Pre-Delivery Check', done: false, tests: 'BP, Group B Strep test' },
      { week: 38, label: 'Weekly Monitoring', done: false, tests: 'Fetal heart rate, BP' },
      { week: 40, label: 'Delivery Date', done: false, tests: 'Hospital admission preparation' },
    ],
    menuProfile: 'Profile', menuNotif: 'Notifications', menuHelp: 'Help',
    profileTitle: 'My Profile', notifTitle: 'Notifications', helpTitle: 'Help & Support',
    helpItems: ['📞 ASHA Worker: 9876543210', '🏥 PHC: 044-2345678', '🚑 Emergency: 108', '📋 Health Helpline: 104'],
    notifItems: ['💊 Take Iron & Folic Acid', '💧 Drink 8 glasses of water', '📅 Checkup on Apr 5, 2026', '🏃 Do 20 min walking today'],
  },
  ta: {
    hello: 'வணக்கம்,', name: 'மலர்', location: 'கிராமம் பிளாக் A',
    tapListen: 'கேட்க தட்டவும்',
    listenText: 'வணக்கம்! இன்று இரும்புச்சத்து மாத்திரை எடுத்துக்கொள்ளுங்கள், 8 கிளாஸ் தண்ணீர் குடிக்கவும்.',
    reminders: 'இன்றைய நினைவூட்டல்கள்',
    ironSupp: 'இரும்புச்சத்து மாத்திரை', ironDone: 'முடிந்தது', ironPending: 'இப்போது எடு',
    hydration: 'நீர் குடிப்பு', hydrationDesc: '0/8 கிளாஸ்',
    nextCheckup: 'அடுத்த பரிசோதனை', checkupDate: 'ஏப். 5, 2026',
    viewCalendar: '📅 ANC காலெண்டர்',
    pregnancyUpdate: 'கர்ப்பகால தகவல்', trimester: 'திமஸ்டர் 2',
    week: 'வாரம் 14', weightGain: '+2கிகி',
    banner: 'ஆரோக்கியமான அம்மா • ஆரோக்கியமான குழந்தை ♥',
    langBtn: '🌐 English',
    calTitle: 'ANC பரிசோதனை அட்டவணை',
    calClose: '✕ மூடு',
    calDue: 'பிரசவ தேதி (மதிப்பீடு)',
    visits: [
      { week: 8, label: 'முதல் ANC வருகை', done: true, tests: 'இரத்த பரிசோதனை, BP, எடை' },
      { week: 12, label: 'நியூக்கல் ஸ்கேன்', done: true, tests: 'அல்ட்ராசவுண்ட், ஸ்க்ரீனிங்' },
      { week: 16, label: 'நடு கர்ப்ப சோதனை', done: true, tests: 'BP, எடை, சிறுநீர் பரிசோதனை' },
      { week: 20, label: 'அனாமலி ஸ்கேன்', done: false, tests: 'குழந்தை உடல் அல்ட்ராசவுண்ட்' },
      { week: 24, label: 'குளூகோஸ் சோதனை', done: false, tests: 'GDM சோதனை, CBC, சிறுநீர்' },
      { week: 28, label: 'மூன்றாம் திமஸ்டர்', done: false, tests: 'BP, குழந்தை வளர்ச்சி' },
      { week: 32, label: 'வளர்ச்சி ஸ்கேன்', done: false, tests: 'அல்ட்ராசவுண்ட், நிலை' },
      { week: 36, label: 'பிரசவ முன் சோதனை', done: false, tests: 'BP, Group B சோதனை' },
      { week: 38, label: 'வாரந்தோறும் கண்காணிப்பு', done: false, tests: 'இதயத்துடிப்பு, BP' },
      { week: 40, label: 'பிரசவ தேதி', done: false, tests: 'மருத்துவமனை அனுமதி' },
    ],
    menuProfile: 'சுயவிவரம்', menuNotif: 'அறிவிப்புகள்', menuHelp: 'உதவி',
    profileTitle: 'என் சுயவிவரம்', notifTitle: 'அறிவிப்புகள்', helpTitle: 'உதவி & ஆதரவு',
    helpItems: ['📞 ASHA ஊழியர்: 9876543210', '🏥 PHC: 044-2345678', '🚑 அவசர: 108', '📋 சுகாதார உதவி: 104'],
    notifItems: ['💊 இரும்பு மாத்திரை எடுக்கவும்', '💧 8 கிளாஸ் தண்ணீர் குடிக்கவும்', '📅 பரிசோதனை ஏப். 5, 2026', '🏃 20 நிமிட நடை பயிற்சி'],
  },
};

interface Props {
  lang: Lang; setLang: (l: Lang) => void;
  setTab: (t: Tab) => void; patientData?: Record<string, string>;
}

function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 50, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '1.25rem 1.25rem 0 0', width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

export default function HomeScreen({ lang, setLang, patientData }: Props) {
  const t = tx[lang] ?? tx.en;
  const displayName = patientData?.name?.split(' ')[0]?.toLowerCase() || t.name;
  const displayLocation = patientData?.location || t.location;
  const currentWeek = parseInt(patientData?.weeks || '14');
  const displayWeek = `Week ${currentWeek}`;
  const displayTrimester = currentWeek <= 13 ? (lang === 'ta' ? 'திமஸ்டர் 1' : 'Trimester 1') : currentWeek <= 26 ? (lang === 'ta' ? 'திமஸ்டர் 2' : 'Trimester 2') : (lang === 'ta' ? 'திமஸ்டர் 3' : 'Trimester 3');

  const [ironDone, setIronDone] = useState(true);
  const [showCal, setShowCal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<'main' | 'profile' | 'notif' | 'help'>('main');

  // Compute delivery date from current week
  const today = new Date(2026, 2, 28); // March 28, 2026
  const weeksLeft = 40 - currentWeek;
  const deliveryDate = new Date(today.getTime() + weeksLeft * 7 * 86400000);
  const deliveryStr = deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Next checkup (next ANC visit week)
  const nextVisitWeek = t.visits.find(v => v.week > currentWeek)?.week ?? 40;
  const daysToNext = (nextVisitWeek - currentWeek) * 7;
  const nextDate = new Date(today.getTime() + daysToNext * 86400000);
  const nextDateStr = nextDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const openMenu = (v: 'main' | 'profile' | 'notif' | 'help') => { setMenuView(v); setMenuOpen(true); };

  const S = (px: string) => ({ fontSize: px });

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.7rem 0.85rem 0.5rem', background: '#f5f0e8', overflow: 'hidden', gap: '0.45rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button onClick={() => openMenu('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '1.2rem', padding: '0 0.1rem', lineHeight: 1 }}>⋮</button>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a1a', margin: 0, lineHeight: 1.1 }}>{t.hello} {displayName}</h1>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>{displayLocation}</p>
          </div>
        </div>
        <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}>
          {t.langBtn}
        </button>
      </div>

      {/* Tap to Listen */}
      <button className="btn-red" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', borderRadius: '0.65rem' }} onClick={() => speak(t.listenText, lang)}>
        🔊 {t.tapListen}
      </button>

      {/* Today's Reminders */}
      <div className="card" style={{ padding: '0.6rem 0.75rem', marginBottom: 0, flex: '0 0 auto' }}>
        <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#1a1a1a', margin: '0 0 0.3rem' }}>{t.reminders}</p>

        {/* Iron */}
        <div className="reminder-row" onClick={() => setIronDone(v => !v)} style={{ cursor: 'pointer', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>💊</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.78rem', color: '#1a1a1a' }}>{t.ironSupp}</p>
            <p style={{ margin: 0, fontSize: '0.68rem', color: ironDone ? '#4CAF50' : '#aaa' }}>{ironDone ? t.ironDone : t.ironPending}</p>
          </div>
          <span style={{ color: '#e91e63', fontSize: '1rem' }}>{ironDone ? '✓' : '○'}</span>
        </div>

        {/* Hydration */}
        <div className="reminder-row" style={{ paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>💧</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.78rem', color: '#1a1a1a' }}>{t.hydration}</p>
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#aaa' }}>{t.hydrationDesc}</p>
          </div>
          <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #ccc' }} />
        </div>

        {/* Next Checkup */}
        <div className="reminder-row" style={{ paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>🏥</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.78rem', color: '#1a1a1a' }}>{t.nextCheckup}</p>
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#aaa' }}>{nextDateStr}</p>
          </div>
          <span style={{ color: '#ccc', fontSize: '1rem' }}>›</span>
        </div>

        {/* ANC Calendar link */}
        <div onClick={() => setShowCal(true)} style={{ border: '1.5px dashed #e91e63', borderRadius: '0.5rem', padding: '0.35rem 0.65rem', marginTop: '0.4rem', textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#e91e63', fontSize: '0.72rem', fontWeight: 600 }}>{t.viewCalendar}</span>
        </div>
      </div>

      {/* Pregnancy Update */}
      <div className="card" style={{ padding: '0.5rem 0.75rem', marginBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ color: '#e91e63', fontSize: '0.75rem' }}>♡</span>
            <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#1a1a1a' }}>{t.pregnancyUpdate}</span>
          </div>
          <p style={{ margin: '0.1rem 0 0', fontSize: '0.68rem', color: '#888' }}>{displayTrimester}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#e91e63' }}>{displayWeek}</span>
          <span style={{ background: '#fce4ec', color: '#e91e63', borderRadius: '0.25rem', padding: '0.1rem 0.35rem', fontSize: '0.65rem', fontWeight: 700 }}>{t.weightGain}</span>
        </div>
      </div>

      {/* Banner */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #c2185b, #e91e63, #ad1457)', borderRadius: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: 'white', textAlign: 'center', letterSpacing: '0.02em', lineHeight: 1.5 }}>{t.banner}</p>
      </div>

      {/* ── ANC Calendar Modal ─────────────────────────── */}
      {showCal && (
        <Overlay onClose={() => setShowCal(false)}>
          <div style={{ padding: '1rem 1rem 0.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#b91c1c' }}>{t.calTitle}</h3>
            <button onClick={() => setShowCal(false)} style={{ background: '#fee2e2', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#b91c1c', fontWeight: 700, fontSize: '0.8rem' }}>{t.calClose.slice(0, 1)}</button>
          </div>
          <div style={{ padding: '0.5rem 1rem', background: '#fce4ec', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 600 }}>📅 {t.calDue}: <strong>{deliveryStr}</strong></span>
            <span style={{ fontSize: '0.7rem', background: '#b91c1c', color: 'white', borderRadius: '1rem', padding: '0.15rem 0.6rem', fontWeight: 700 }}>Week {currentWeek}</span>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem 1rem 1rem' }}>
            {t.visits.map((v, i) => {
              const isPast = v.week < currentWeek;
              const isCurrent = v.week === currentWeek || (v.week > currentWeek && (i === 0 || t.visits[i - 1].week < currentWeek));
              const visitDays = (v.week - currentWeek) * 7;
              const visitDate = new Date(today.getTime() + visitDays * 86400000);
              const visitDateStr = isPast ? '✓ Done' : visitDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
              return (
                <div key={v.week} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 32 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: isPast ? '#4CAF50' : isCurrent ? '#b91c1c' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'white' }}>
                      {isPast ? '✓' : v.week}
                    </div>
                    {i < t.visits.length - 1 && <div style={{ width: 2, height: 18, background: isPast ? '#4CAF50' : '#e0e0e0', marginTop: 2 }} />}
                  </div>
                  <div style={{ flex: 1, background: isPast ? '#e8f5e9' : isCurrent ? '#fce4ec' : 'white', borderRadius: '0.6rem', padding: '0.4rem 0.6rem', border: isCurrent ? '1.5px solid #e91e63' : '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.75rem', color: isPast ? '#2e7d32' : isCurrent ? '#b91c1c' : '#1a1a1a' }}>{v.label}</span>
                      <span style={{ fontSize: '0.65rem', color: isPast ? '#4CAF50' : '#888', fontWeight: 600 }}>{visitDateStr}</span>
                    </div>
                    <p style={{ margin: '0.15rem 0 0', fontSize: '0.68rem', color: '#888' }}>{v.tests}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Overlay>
      )}

      {/* ── Three Dots Menu ───────────────────────────── */}
      {menuOpen && (
        <Overlay onClose={() => { setMenuOpen(false); setMenuView('main'); }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1a1a1a' }}>
              {menuView === 'main' ? '☰ Menu' : menuView === 'profile' ? t.profileTitle : menuView === 'notif' ? t.notifTitle : t.helpTitle}
            </h3>
            <button onClick={() => { setMenuOpen(false); setMenuView('main'); }} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>✕</button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, padding: '0.75rem 1rem 1.25rem' }}>
            {menuView === 'main' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {([
                  { icon: '👤', label: t.menuProfile, view: 'profile', bg: '#fce4ec', color: '#b91c1c' },
                  { icon: '🔔', label: t.menuNotif, view: 'notif', bg: '#e3f2fd', color: '#1565c0' },
                  { icon: '❓', label: t.menuHelp, view: 'help', bg: '#e8f5e9', color: '#2e7d32' },
                ] as const).map(item => (
                  <button key={item.view} onClick={() => setMenuView(item.view)} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'white', border: '1.5px solid #f0f0f0', borderRadius: '0.75rem', padding: '0.85rem 1rem', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: item.color }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto', color: '#ccc' }}>›</span>
                  </button>
                ))}
              </div>
            )}
            {menuView === 'profile' && (
              <div>
                <button onClick={() => setMenuView('main')} style={{ background: 'none', border: 'none', color: '#e91e63', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', marginBottom: '0.75rem', padding: 0 }}>← Back</button>
                <div style={{ background: 'linear-gradient(135deg,#b91c1c,#e91e63)', borderRadius: '1rem', padding: '1rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>👩</div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: 'white' }}>{patientData?.name || displayName}</p>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)' }}>{displayLocation}</p>
                </div>
                {[
                  { label: 'Age', val: patientData?.age ? `${patientData.age} years` : '–' },
                  { label: 'Phone', val: patientData?.phone ? `+91 ${patientData.phone}` : '–' },
                  { label: 'Blood Group', val: patientData?.blood || '–' },
                  { label: 'Weeks Pregnant', val: `Week ${currentWeek} (${displayTrimester})` },
                  { label: 'Husband', val: patientData?.husband || '–' },
                  { label: 'Emergency Contact', val: patientData?.emergency ? `+91 ${patientData.emergency}` : '–' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600 }}>{row.label}</span>
                    <span style={{ fontSize: '0.78rem', color: '#1a1a1a', fontWeight: 700 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            )}
            {menuView === 'notif' && (
              <div>
                <button onClick={() => setMenuView('main')} style={{ background: 'none', border: 'none', color: '#e91e63', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', marginBottom: '0.75rem', padding: 0 }}>← Back</button>
                {t.notifItems.map((n, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.65rem 0.75rem', background: i % 2 === 0 ? '#fce4ec' : 'white', borderRadius: '0.65rem', marginBottom: '0.45rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>{n.slice(0, 2)}</span>
                    <span style={{ fontSize: '0.82rem', color: '#1a1a1a', fontWeight: 500 }}>{n.slice(3)}</span>
                  </div>
                ))}
              </div>
            )}
            {menuView === 'help' && (
              <div>
                <button onClick={() => setMenuView('main')} style={{ background: 'none', border: 'none', color: '#e91e63', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', marginBottom: '0.75rem', padding: 0 }}>← Back</button>
                <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '0.75rem' }}>Tap a number to call directly:</p>
                {t.helpItems.map((h, i) => {
                  const num = h.match(/\d[\d\s]+/)?.[0]?.replace(/\s/g, '') || '';
                  return (
                    <a key={i} href={`tel:${num}`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.65rem 0.75rem', background: 'white', borderRadius: '0.65rem', marginBottom: '0.45rem', textDecoration: 'none', border: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: '0.9rem' }}>{h.slice(0, 2)}</span>
                      <span style={{ fontSize: '0.82rem', color: '#1a1a1a', fontWeight: 600 }}>{h.slice(3)}</span>
                      <span style={{ marginLeft: 'auto', color: '#b91c1c', fontSize: '0.75rem', fontWeight: 700 }}>📞 Call</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
}
