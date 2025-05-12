import React from 'react';

const categories = [
  { name: 'Ботулинотоксины', image: '/images/botox.jpg' },
  { name: 'Филлеры', image: '/images/fillers.jpg' },
  { name: 'Биоревитализация', image: '/images/biorevital.jpg' },
  { name: 'Мезотерапия', image: '/images/meso.jpg' },
  { name: 'Липолитики', image: '/images/lipolytics.jpg' },
  { name: 'Пептиды и концентраты', image: '/images/peptides.jpg' },
  { name: 'Аппараты и расходники', image: '/images/tools.jpg' },
  { name: 'Наборы и комплекты', image: '/images/sets.jpg' },
  { name: 'Мезонити', image: '/images/threads.jpg' },
  { name: 'Уход после процедуры', image: '/images/care.jpg' },
];

const App = () => {
  return (
    <div style={{ padding: '20px', background: '#111', color: 'white' }}>
      <h2 style={{ marginBottom: '20px' }}>Категории</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px',
              padding: '60px 10px 10px 10px',
              color: 'white',
              fontWeight: 'bold',
              position: 'relative',
              height: '120px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '5px 8px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '14px'
              }}
            >
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
