import React, { useState } from 'react';
import type { Lang } from '../App';

interface Props { lang: Lang; patientData?: Record<string, string>; }

interface FoodItem { name: string; nutrient: string; checked: boolean; }

const dietData = {
  en: {
    title: 'Daily Food Chart',
    subtitle: 'What did you eat today?',
    hydrationLabel: 'Hydration', hydrationDesc: 'Drink 8 glasses of water daily',
    meals: [
      { key: 'breakfast', label: '🌅 Breakfast', color: '#E65100' },
      { key: 'lunch', label: '☀️ Lunch', color: '#F57F17' },
      { key: 'dinner', label: '🌙 Dinner', color: '#1565c0' },
    ],
    foods: {
      breakfast: [
        { name: 'Ragi / Millet Porridge', nutrient: 'Energy & Iron', checked: true },
        { name: 'Boiled Egg', nutrient: 'Protein', checked: true },
      ],
      lunch: [
        { name: 'Rice with Local Greens', nutrient: 'Iron & Folate', checked: false },
        { name: 'Dal / Lentil Curry', nutrient: 'Protein & Iron', checked: false },
      ],
      dinner: [
        { name: 'Chapati & Vegetable Curry', nutrient: 'Carbs & Vitamins', checked: false },
        { name: 'Curd / Yogurt', nutrient: 'Calcium', checked: false },
      ],
    } as Record<string, FoodItem[]>,
  },
  ta: {
    title: 'தினசரி உணவு அட்டவணை',
    subtitle: 'இன்று என்ன சாப்பிட்டீர்கள்?',
    hydrationLabel: 'நீர் குடிப்பு', hydrationDesc: 'தினமும் 8 கிளாஸ் தண்ணீர் குடிக்கவும்',
    meals: [
      { key: 'breakfast', label: '🌅 காலை உணவு', color: '#E65100' },
      { key: 'lunch', label: '☀️ மதிய உணவு', color: '#F57F17' },
      { key: 'dinner', label: '🌙 இரவு உணவு', color: '#1565c0' },
    ],
    foods: {
      breakfast: [
        { name: 'ராகி / தினை கஞ்சி', nutrient: 'ஆற்றல் & இரும்புச்சத்து', checked: true },
        { name: 'வேகவைத்த முட்டை', nutrient: 'புரதம்', checked: true },
      ],
      lunch: [
        { name: 'கீரை சாதம்', nutrient: 'இரும்பு & ஃபோலேட்', checked: false },
        { name: 'பருப்பு கறி', nutrient: 'புரதம் & இரும்புச்சத்து', checked: false },
      ],
      dinner: [
        { name: 'காய்கறி கறியுடன் சப்பாத்தி', nutrient: 'கார்ப்ஸ் & வைட்டமின்கள்', checked: false },
        { name: 'தயிர்', nutrient: 'கால்சியம்', checked: false },
      ],
    } as Record<string, FoodItem[]>,
  },
};

export default function DietScreen({ lang, patientData }: Props) {
  const d = dietData[lang] ?? dietData.en;
  const [waterCount, setWaterCount] = useState(0);
  const [foods, setFoods] = useState<Record<string, FoodItem[]>>(
    Object.fromEntries(Object.entries(d.foods).map(([k, v]) => [k, v.map(f => ({ ...f }))]))
  );

  const toggleFood = (meal: string, idx: number) => {
    setFoods(prev => ({ ...prev, [meal]: prev[meal].map((f, i) => i === idx ? { ...f, checked: !f.checked } : f) }));
  };

  return (
    <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0.7rem 0.85rem 0.5rem', background: '#f5f0e8', overflow: 'hidden', gap: '0.4rem' }}>
      <div>
        <h1 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 0.1rem' }}>{d.title}</h1>
        <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>{d.subtitle}</p>
      </div>

      {/* Hydration */}
      <div className="card" style={{ padding: '0.55rem 0.7rem', marginBottom: 0, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>💧</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: '#1a1a1a' }}>{d.hydrationLabel}</p>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#888' }}>{d.hydrationDesc}</p>
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1565c0' }}>{waterCount}/8</span>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setWaterCount(i < waterCount ? i : i + 1)}
              style={{ flex: 1, height: 26, borderRadius: '0.35rem', border: `1.5px solid #1565c0`, background: i < waterCount ? '#1565c0' : 'white', cursor: 'pointer', fontSize: '0.65rem', color: i < waterCount ? 'white' : '#1565c0', fontWeight: 700 }}>
              {i < waterCount ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Meals */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {d.meals.map(({ key, label, color }) => (
          <div key={key}>
            <p style={{ fontWeight: 700, fontSize: '0.75rem', color, margin: '0 0 0.3rem' }}>{label}</p>
            {(foods[key] || []).map((food, i) => (
              <div key={i} onClick={() => toggleFood(key, i)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'white', borderRadius: '0.6rem', padding: '0.45rem 0.65rem', marginBottom: '0.3rem', cursor: 'pointer', borderLeft: `3px solid ${food.checked ? '#4CAF50' : '#e91e63'}` }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.78rem', color: '#1a1a1a' }}>{food.name}</p>
                  <p style={{ margin: 0, fontSize: '0.62rem', color: '#888' }}>{food.nutrient}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.65rem', color: '#888' }}>x1</span>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${food.checked ? '#4CAF50' : '#ccc'}`, background: food.checked ? '#e8f5e9' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4CAF50', fontSize: '0.7rem' }}>
                    {food.checked ? '✓' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
