import React, { useState } from 'react';
import type { Lang } from '../App';

interface FoodItem {
  name: string;
  nutrient: string;
  checked: boolean;
}

const dietData = {
  en: {
    title: 'Daily Food Chart',
    subtitle: 'What did you eat today?',
    hydrationLabel: 'Hydration',
    hydrationDesc: 'Drink 8 glasses of water daily',
    breakfast: '🌅 Breakfast',
    lunch: '☀️ Lunch',
    dinner: '🌙 Dinner',
    snack: '🍎 Snack',
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
        { name: 'Chapati with Vegetable Curry', nutrient: 'Carbs & Vitamins', checked: false },
        { name: 'Curd / Yogurt', nutrient: 'Calcium & Probiotics', checked: false },
      ],
      snack: [
        { name: 'Banana & Peanuts', nutrient: 'Potassium & Protein', checked: false },
      ],
    },
  },
  ta: {
    title: 'தினசரி உணவு அட்டவணை',
    subtitle: 'இன்று என்ன சாப்பிட்டீர்கள்?',
    hydrationLabel: 'நீர் குடிப்பு',
    hydrationDesc: 'தினமும் 8 கிளாஸ் தண்ணீர் குடிக்கவும்',
    breakfast: '🌅 காலை உணவு',
    lunch: '☀️ மதிய உணவு',
    dinner: '🌙 இரவு உணவு',
    snack: '🍎 சிற்றுண்டி',
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
        { name: 'தயிர்', nutrient: 'கால்சியம் & புரோபயோடிக்', checked: false },
      ],
      snack: [
        { name: 'வாழைப்பழம் & வேர்க்கடலை', nutrient: 'பொட்டாசியம் & புரதம்', checked: false },
      ],
    },
  },
};

interface Props {
  lang: Lang;
}

export default function DietScreen({ lang }: Props) {
  const d = dietData[lang] ?? dietData.en;
  const [waterCount, setWaterCount] = useState(0);
  const [foods, setFoods] = useState<Record<string, FoodItem[]>>(d.foods as Record<string, FoodItem[]>);

  const toggleFood = (meal: string, idx: number) => {
    setFoods(prev => ({
      ...prev,
      [meal]: prev[meal].map((f, i) => i === idx ? { ...f, checked: !f.checked } : f),
    }));
  };

  const meals: Array<{ key: string; label: string }> = [
    { key: 'breakfast', label: d.breakfast },
    { key: 'lunch', label: d.lunch },
    { key: 'dinner', label: d.dinner },
    { key: 'snack', label: d.snack },
  ];

  return (
    <div className="fadeIn" style={{ padding: '1.25rem 1rem 1rem', background: '#f5f0e8', minHeight: '100%' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 0.25rem' }}>{d.title}</h1>
      <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#888' }}>{d.subtitle}</p>

      {/* Hydration tracker */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            💧
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{d.hydrationLabel}</p>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: '#888', lineHeight: 1.3 }}>{d.hydrationDesc}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1565c0' }}>{waterCount}/8</span>
          </div>
        </div>
        {/* Water buttons */}
        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setWaterCount(i < waterCount ? i : i + 1)}
              style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #1565c0', background: i < waterCount ? '#1565c0' : 'white', cursor: 'pointer', fontSize: '0.7rem', color: i < waterCount ? 'white' : '#1565c0', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {i < waterCount ? '✓' : '○'}
            </button>
          ))}
        </div>
      </div>

      {/* Meals */}
      {meals.map(({ key, label }) => (
        <div key={key} style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#E65100', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {label}
          </p>
          {(foods[key] || []).map((food, i) => (
            <div
              key={i}
              className="food-item"
              onClick={() => toggleFood(key, i)}
              style={{ cursor: 'pointer', borderLeftColor: food.checked ? '#4CAF50' : '#e91e63' }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{food.name}</p>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: '#888' }}>{food.nutrient}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#888' }}>x1</span>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${food.checked ? '#4CAF50' : '#ccc'}`, background: food.checked ? '#e8f5e9' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4CAF50', fontSize: '0.85rem' }}>
                  {food.checked ? '✓' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
