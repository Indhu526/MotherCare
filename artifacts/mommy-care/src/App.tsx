import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import SymptomScreen from './screens/SymptomScreen';
import MoreScreen from './screens/MoreScreen';

type Tab = 'home' | 'calendar' | 'symptoms' | 'more';

const navItems: { key: Tab; emoji: string; labelEn: string; labelTa: string }[] = [
  { key: 'home', emoji: '🏠', labelEn: 'Home', labelTa: 'முகப்பு' },
  { key: 'calendar', emoji: '📅', labelEn: 'Tracker', labelTa: 'கண்காணிப்பு' },
  { key: 'symptoms', emoji: '🩺', labelEn: 'Symptoms', labelTa: 'அறிகுறிகள்' },
  { key: 'more', emoji: '🌸', labelEn: 'More', labelTa: 'மேலும்' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [language, setLanguage] = useState<string>('en');

  const renderScreen = () => {
    switch (tab) {
      case 'home': return <HomeScreen language={language} />;
      case 'calendar': return <CalendarScreen language={language} />;
      case 'symptoms': return <SymptomScreen language={language} />;
      case 'more': return <MoreScreen language={language} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <div className="header">
        <div className="header-logo">
          <span style={{ fontSize: '1.5rem' }}>🤰</span>
          <span>MommyCare</span>
        </div>
        <div className="lang-toggle">
          <button className={`lang-btn${language === 'en' ? ' active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
          <button className={`lang-btn${language === 'ta' ? ' active' : ''}`} onClick={() => setLanguage('ta')}>த</button>
        </div>
      </div>

      {/* Screen content */}
      <div className="screen-content">
        {renderScreen()}
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`nav-btn${tab === item.key ? ' active' : ''}`}
            onClick={() => setTab(item.key)}
          >
            <span style={{ fontSize: '1.4rem' }}>{item.emoji}</span>
            <span>{language === 'ta' ? item.labelTa : item.labelEn}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
