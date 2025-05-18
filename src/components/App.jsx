import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CartPage from './CartPage';
import CartButton from './CartButton';
import ConfirmPage from './ConfirmPage';
import { useCart } from '../context/AppContext';

const categories = [
  { id: 'botox', name: 'Ботулинотоксины', image: '/images/botox.jpg' },
  { id: 'fillers', name: 'Филлеры', image: '/images/fillers.jpg' },
  { id: 'biorevital', name: 'Биоревитализация', image: '/images/biorevital.jpg' },
  { id: 'meso', name: 'Мезотерапия', image: '/images/meso.jpg' },
  { id: 'lipolytics', name: 'Липолитики', image: '/images/lipolytics.jpg' },
  { id: 'peptides', name: 'Пептиды и концентраты', image: '/images/peptides.jpg' },
  { id: 'devices', name: 'Аппараты и расходники', image: '/images/tools.jpg' },
  { id: 'sets', name: 'Наборы и комплекты', image: '/images/sets.jpg' },
  { id: 'threads', name: 'Мезонити', image: '/images/threads.jpg' },
  { id: 'care', name: 'Уход после процедуры', image: '/images/care.jpg' }
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const { cart } = useCart();

  const handleBack = () => setSelectedCategory(null);
  const handleOpenCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  const handleConfirmOrder = () => {
    setShowCart(false);
    setConfirmOrder(true);
  };

  if (confirmOrder) {
    return <ConfirmPage onBack={() => setConfirmOrder(false)} />;
  }

  if (showCart) {
    return <CartPage onBack={handleCloseCart} onConfirm={handleConfirmOrder} />;
  }

  if (selectedCategory) {
    return (
      <>
        <ProductList categoryId={selectedCategory} onBack={handleBack} />
        <CartButton onClick={handleOpenCart} />
      </>
    );
  }

  return (
    <div style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '16px' }}>Категории</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              height: '120px',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              boxShadow: '0 0 8px rgba(0,0,0,0.4)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                textAlign: 'center',
                padding: '8px',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              {cat.name}
            </div>
          </div>
        ))}
      </div>

      <CartButton onClick={handleOpenCart} />
    </div>
  );
};

export default App;
