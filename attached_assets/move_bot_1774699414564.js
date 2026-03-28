const fs = require('fs');

// ==== 1. Process CalendarScreen.jsx ====
let cal = fs.readFileSync('src/screens/CalendarScreen.jsx', 'utf8');

// Add text
cal = cal.replace("notes: 'NOTES'", "notes: 'NOTES',\n        ammaChatBtn: 'Chat with AI Amma',\n        typeMsg: 'Type your message...',\n        send: 'Send',\n        ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',\n        ammaDefault: 'I am here for you. Please eat healthy food and take rest. If you feel unwell, contact a doctor.',\n        ammaMed: 'Please take rest and drink water. If it continues, consult your doctor.'");
cal = cal.replace("notes: 'குறிப்புகள்'", "notes: 'குறிப்புகள்',\n        ammaChatBtn: 'AI அம்மாவுடன் பேசுங்கள்',\n        typeMsg: 'உங்கள் செய்தியை தட்டச்சு செய்க...',\n        send: 'அனுப்பு',\n        ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உங்கள் உடல்நிலை எப்படி உள்ளது? ❤️',\n        ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவைச் சாப்பிட்டு ஓய்வெடுக்கவும். உடல்நலக்குறைவு ஏற்பட்டால், மருத்துவரை அணுகவும்.',\n        ammaMed: 'கொஞ்சம் ஓய்வு எடுத்துக்கொள்ளுங்கள், தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.'");

// Update imports
cal = cal.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useRef } from 'react';");

// Add States
cal = cal.replace("const [showReport, setShowReport] = useState(false);", "const [showReport, setShowReport] = useState(false);\n    const [viewAmma, setViewAmma] = useState(false);\n    const [chatMsgs, setChatMsgs] = useState([]);\n    const [chatInput, setChatInput] = useState('');\n    const chatEndRef = useRef(null);");

// Add Logic & View (Insert right before 'if (showReport)')
const calLogic = `
    const handleSendAmma = () => {
        if (!chatInput.trim()) return;
        const newMsgs = [...chatMsgs, { sender: 'user', text: chatInput }];
        setChatMsgs(newMsgs);
        setChatInput('');

        let response = t.ammaDefault;
        const lower = chatInput.toLowerCase();
        if (lower.includes('headache') || lower.includes('pain') || lower.includes('fever') || lower.includes('தலைவலி') || lower.includes('வலி') || lower.includes('காய்ச்சல்')) {
            response = t.ammaMed;
        }

        setTimeout(() => {
            setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
            speak(response, language);
        }, 800);
    };

    useEffect(() => {
        if (viewAmma && chatMsgs.length === 0) {
            setChatMsgs([{ sender: 'amma', text: t.ammaWelcome }]);
            speak(t.ammaWelcome, language);
        }
    }, [viewAmma, language]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMsgs]);

    if (viewAmma) {
        return (
            <div className="calendar-screen fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '70px', background: '#fff9fa' }}>
                <div style={{ flex: '0 0 auto' }}>
                    <button onClick={() => setViewAmma(false)} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.8rem' }}>Back</button>
                    <h1 className="screen-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark)', fontSize: '1.4rem' }}>
                        <div style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>👩‍⚕️</div>
                        {t.ammaChatBtn}
                    </h1>
                </div>

                <div style={{ flex: '1 1 auto', overflowY: 'auto', background: 'white', borderRadius: '15px', padding: '1rem', marginBottom: '1rem', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.03)', border: '1.5px solid var(--primary-light)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {chatMsgs.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ maxWidth: '85%', padding: '0.8rem 1rem', borderRadius: '15px', borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px', borderBottomLeftRadius: msg.sender === 'amma' ? '0' : '15px', background: msg.sender === 'user' ? 'var(--primary-light)' : '#f0f2f5', color: msg.sender === 'user' ? 'var(--primary-dark)' : 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder={t.typeMsg}
                        style={{ flex: 1, padding: '1rem', borderRadius: '25px', border: '1.5px solid var(--primary-light)', fontSize: '1rem', outline: 'none' }}
                        onKeyPress={e => e.key === 'Enter' && handleSendAmma()}
                    />
                    <button
                        onClick={handleSendAmma}
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '0 1.5rem', borderRadius: '25px', boxShadow: '0 4px 10px rgba(233,30,99,0.2)' }}
                    >
                        {t.send}
                    </button>
                </div>
            </div>
        );
    }
`;
cal = cal.replace("if (showReport) {", calLogic + "\n    if (showReport) {");

// Flex layout & add button
const newReturn = `
    return (
        <div className="calendar-screen fadeIn" style={{ paddingBottom: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h1 className="screen-title" style={{ fontSize: '1.5rem', marginBottom: '0', marginTop: 0, flex: '0 0 auto' }}>{t.title}</h1>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <div className="card" onClick={handleTakePill} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: tookPill ? 'var(--primary-light)' : 'white', margin: 0, padding: '0.8rem 0.8rem', border: '1.5px solid var(--primary-light)', borderRadius: '12px' }}>
                    <div style={{ background: 'var(--primary)', height: '40px', width: '40px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>💊</div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{t.pillTitle}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{t.pillDesc}</p>
                    </div>
                    <div>{tookPill ? <CheckCircle size={28} color="var(--primary)" /> : <Circle size={28} color="var(--text-muted)" />}</div>
                </div>

                <div className="card" onClick={handleRecordKick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: kickCount >= 10 ? '#E8F5E9' : 'white', margin: 0, padding: '0.8rem 0.8rem', border: '1.5px solid #4CAF50', borderRadius: '12px' }}>
                    <div style={{ background: '#4CAF50', height: '40px', width: '40px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🦶</div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.1rem', color: '#2E7D32', margin: 0 }}>{t.kickTitle}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{t.kickDesc}</p>
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2E7D32' }}>{kickCount}/10</div>
                </div>

                <div className="card" style={{ margin: 0, padding: '0.8rem', border: '1.5px solid #ddd', borderRadius: '12px' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', marginTop: 0 }}>{t.trimester}</h2>
                    <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--primary-light)' }}>
                        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                            <div style={{ position: 'absolute', left: '-1.85rem', top: '0', background: 'var(--primary)', color: 'white', width: '16px', height: '16px', borderRadius: '50%' }}></div>
                            <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem', margin: 0 }}>🥗 {t.w14}</h3>
                        </div>
                        <div style={{ position: 'relative', marginBottom: '0.5rem', opacity: 0.6 }}>
                            <div style={{ position: 'absolute', left: '-1.85rem', top: '0', background: 'var(--text-muted)', width: '16px', height: '16px', borderRadius: '50%' }}></div>
                            <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem', margin: 0 }}>💉 {t.w15}</h3>
                        </div>
                        <div style={{ position: 'relative', opacity: 0.6 }}>
                            <div style={{ position: 'absolute', left: '-1.85rem', top: '0', background: 'var(--text-muted)', width: '16px', height: '16px', borderRadius: '50%' }}></div>
                            <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem', margin: 0 }}>🩺 {t.w16}</h3>
                        </div>
                    </div>
                </div>

                <div className="card" onClick={() => setShowScanBook(!showScanBook)} style={{ background: '#F8FBFF', border: '1.5px solid #E3F2FD', borderRadius: '12px', cursor: 'pointer', padding: '0.8rem', margin: 0 }}>
                    <h2 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1976D2' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📖 {t.passbookTitle}</span>
                        <span style={{ fontSize: '1rem' }}>{showScanBook ? '▲' : '▼'}</span>
                    </h2>

                    {showScanBook && (
                        <div className="fadeIn" style={{ background: 'white', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid #4CAF50', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginTop: '0.6rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-dark)', fontSize: '0.9rem' }}>{t.scan1Desc}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.scan1}</span>
                            </div>
                            <p style={{ color: '#4CAF50', fontWeight: 'bold', margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>✓ {t.scan1Status}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px dashed #eee' }}>
                                <span style={{ fontSize: '0.8rem', color: '#1976D2', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    <CheckCircle size={12} /> {t.verify}
                                </span>
                                <button style={{ background: 'var(--primary-light)', padding: '0.3rem 0.6rem', borderRadius: '6px', border: 'none', color: 'var(--primary-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', fontSize: '0.8rem' }} onClick={(e) => { e.stopPropagation(); setShowReport(true); speak("Opening Ultrasound Report", language); }}>
                                    📄 {t.download}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button className="card btn fadeIn" onClick={() => setViewAmma(true)} style={{ background: 'var(--primary-dark)', color: 'white', padding: '0.8rem', justifyContent: 'center', border: 'none', margin: '0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(194,24,91,0.2)', width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>👩‍⚕️</span> {t.ammaChatBtn}
                </button>
            </div>
        </div>
    );
};
`;

const startIndex = cal.indexOf("return (\\n        <div className=\\"calendar - screen fadeIn\\" style={{ paddingBottom: '0' }}>");
cal = cal.substring(0, startIndex) + newReturn;

fs.writeFileSync('src/screens/CalendarScreen.jsx', cal);


// ==== 2. Process MoreScreen.jsx to remove AI Amma ====
let more = fs.readFileSync('src/screens/MoreScreen.jsx', 'utf8');

// The snippet to remove
const targetSnippet = \`            <button className="card btn" onClick={() => setView('amma')} style={{ background: 'var(--primary-dark)', color: 'white', padding: '1.5rem', justifyContent: 'flex-start', border: 'none', marginBottom: '1.25rem', borderRadius: '20px', boxShadow: '0 6px 16px rgba(194,24,91,0.3)' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '0.5rem' }}>👩‍⚕️</span> {t.ammaChatBtn}
            </button>\`;

more = more.replace(targetSnippet, "");

fs.writeFileSync('src/screens/MoreScreen.jsx', more);
