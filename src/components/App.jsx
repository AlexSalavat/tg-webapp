import React from 'react';

const categories = [
  'Ботулинотоксины',
  'Филлеры',
  'Биоревитализация',
  'Мезотерапия',
  'Липолитики',
  'Пептиды и концентраты',
  'Аппараты и расходники',
  'Наборы и комплекты',
  'Мезонити',
  'Уход после процедуры'
];

const App = () => {
  return (
    <div style={{ padding: '20px', background: '#111', color: 'white' }}>
      <h2>Категории</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {categories.map((cat, index) => (
          <div key={index} style={{ background: '#222', padding: '10px', borderRadius: '10px' }}>
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
