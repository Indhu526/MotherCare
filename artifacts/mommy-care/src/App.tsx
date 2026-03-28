import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import DietScreen from './screens/DietScreen';
import TrackerScreen from './screens/TrackerScreen';
import MoreScreen from './screens/MoreScreen';
import SOSScreen from './screens/SOSScreen';

export type Tab = 'home' | 'diet' | 'tracker' | 'more' | 'sos';
export type Lang = 'en' | 'ta';

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 014 4"/><path d="M8.5 7C5 7 2 10 2 14c0 4.5 3 9 6 9 1.5 0 2.5-.5 4-.5s2.5.5 4 .5c3 0 6-4.5 6-9 0-4-3-7-6.5-7C14 7 13 7.5 12 7.5S10 7 8.5 7z"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}
function SOSIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

const navItems = [
  { key: 'home' as Tab, Icon: HomeIcon, en: 'Home', ta: 'முகப்பு' },
  { key: 'diet' as Tab, Icon: AppleIcon, en: 'Diet', ta: 'உணவு' },
  { key: 'tracker' as Tab, Icon: CalendarIcon, en: 'Tracker', ta: 'கண்காணிப்பு' },
  { key: 'more' as Tab, Icon: MenuIcon, en: 'More', ta: 'மேலும்' },
  { key: 'sos' as Tab, Icon: SOSIcon, en: 'SOS', ta: 'SOS' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [lang, setLang] = useState<Lang>('en');

  const renderScreen = () => {
    switch (tab) {
      case 'home': return <HomeScreen lang={lang} setLang={setLang} setTab={setTab} />;
      case 'diet': return <DietScreen lang={lang} />;
      case 'tracker': return <TrackerScreen lang={lang} />;
      case 'more': return <MoreScreen lang={lang} setTab={setTab} />;
      case 'sos': return <SOSScreen lang={lang} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="screen-content">
        {renderScreen()}
      </div>
      <nav className="bottom-nav">
        {navItems.map(({ key, Icon, en, ta }) => (
          <button
            key={key}
            className={`nav-btn${tab === key ? (key === 'sos' ? ' active-sos' : ' active') : ''}`}
            onClick={() => setTab(key)}
          >
            <Icon />
            <span>{lang === 'ta' ? ta : en}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
