const fs = require('fs');
let content = fs.readFileSync('src/screens/MoreScreen.jsx', 'utf8');

// 1. Add English Text
content = content.replace("schemesList: [", `ammaChatBtn: 'Chat with AI Amma',
        typeMsg: 'Type your message...',
        send: 'Send',
        ammaWelcome: 'Hello dear! I am AI Amma. How are you feeling today? ❤️',
        ammaDefault: 'I am here for you. Please eat healthy food and take rest. If you feel unwell, contact a doctor.',
        ammaMed: 'Please take rest and drink water. If it continues, consult your doctor.',
        schemesList: [`);

// 2. Add Tamil Text
content = content.replace("schemesList: [\\n            { name: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு திட்டம்'", `ammaChatBtn: 'AI அம்மாவுடன் பேசுங்கள்',
        typeMsg: 'உங்கள் செய்தியை தட்டச்சு செய்க...',
        send: 'அனுப்பு',
        ammaWelcome: 'வணக்கம் மா! நான் AI அம்மா. இன்று உங்கள் உடல்நிலை எப்படி உள்ளது? ❤️',
        ammaDefault: 'நான் உங்களுக்காக இருக்கிறேன். சத்தான உணவைச் சாப்பிட்டு ஓய்வெடுக்கவும்.',
        ammaMed: 'கொஞ்சம் ஓய்வு எடுத்துக்கொள்ளுங்கள், தண்ணீர் குடிக்கவும். தொடர்ந்தால் மருத்துவரை அணுகவும்.',
        schemesList: [\\n            { name: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு திட்டம்'`);

// 3. Add states
content = content.replace("const [dangerDetected, setDangerDetected] = useState(false);", `const [dangerDetected, setDangerDetected] = useState(false);
    const [chatMsgs, setChatMsgs] = useState([]);
    const [chatInput, setChatInput] = useState('');`);

// 4. Add logic
const logic = `
    const handleSendAmma = () => {
        if(!chatInput.trim()) return;
        const newMsgs = [...chatMsgs, { sender: 'user', text: chatInput }];
        setChatMsgs(newMsgs);
        setChatInput('');
        
        let response = t.ammaDefault;
        const lower = chatInput.toLowerCase();
        if(lower.includes('headache') || lower.includes('pain') || lower.includes('fever') || lower.includes('தலைவலி') || lower.includes('வலி')) {
            response = t.ammaMed;
        }

        setTimeout(() => {
            setChatMsgs(prev => [...prev, { sender: 'amma', text: response }]);
            speak(response, language);
        }, 800);
    };

    // Initialize welcome
    useEffect(() => {
        if (view === 'amma' && chatMsgs.length === 0) {
            setChatMsgs([{ sender: 'amma', text: t.ammaWelcome }]);
            speak(t.ammaWelcome, language);
        }
    }, [view, language]);
`;
content = content.replace("const handleStartSymptom = () => {", logic + "\\n    const handleStartSymptom = () => {");

// 5. Add UI View
const uiView = `
    if (view === 'amma') {
        return (
            <div className="more-screen fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '70px' }}>
                <div style={{ flex: '0 0 auto' }}>
                    <button onClick={() => setView('menu')} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.8rem' }}>{t.backBtn}</button>
                    <h1 className="screen-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark)' }}>
                        <div style={{ background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👩‍⚕️</div>
                        {t.ammaChatBtn}
                    </h1>
                </div>

                <div style={{ flex: '1 1 auto', overflowY: 'auto', background: 'white', borderRadius: '15px', padding: '1rem', marginBottom: '1rem', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.03)', border: '1.5px solid var(--primary-light)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {chatMsgs.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ maxWidth: '80%', padding: '0.8rem 1rem', borderRadius: '15px', borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px', borderBottomLeftRadius: msg.sender === 'amma' ? '0' : '15px', background: msg.sender === 'user' ? 'var(--primary-light)' : '#f0f2f5', color: msg.sender === 'user' ? 'var(--primary-dark)' : 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '0.5rem' }}>
                    <input 
                        type="text" 
                        value={chatInput} 
                        onChange={e => setChatInput(e.target.value)} 
                        placeholder={t.typeMsg} 
                        style={{ flex: 1, padding: '1rem', borderRadius: '25px', border: '1.5px solid var(--primary)', fontSize: '1rem', outline: 'none' }}
                        onKeyPress={e => e.key === 'Enter' && handleSendAmma()}
                    />
                    <button 
                        onClick={handleSendAmma} 
                        className="btn btn-primary" 
                        style={{ width: 'auto', padding: '0 1.5rem', borderRadius: '25px' }}
                    >
                        {t.send}
                    </button>
                </div>
            </div>
        );
    }
`;
content = content.replace("if (view === 'schemes') {", uiView + "\\n    if (view === 'schemes') {");

// 6. Add button to main menu
const btn = `
            <button className="card btn" onClick={() => setView('amma')} style={{ background: 'var(--primary-dark)', color: 'white', padding: '1.5rem', justifyContent: 'flex-start', border: 'none', marginBottom: '1rem', borderRadius: '20px', boxShadow: '0 6px 16px rgba(194,24,91,0.3)' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '0.5rem' }}>👩‍⚕️</span> {t.ammaChatBtn}
            </button>
`;
content = content.replace("<h1 className=\\"screen - title\\" style={{ marginBottom: '2rem' }}>{t.title}</h1>", "<h1 className=\\"screen - title\\" style={{ marginBottom: '2rem' }}>{t.title}</h1>" + btn);

fs.writeFileSync('src/screens/MoreScreen.jsx', content);
console.log('AI Amma injected!');
