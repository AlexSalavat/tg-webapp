import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [showControls, setShowControls] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    setShowControls(false);
    setQuantity(1);
    // 👇 Пока просто выводим в alert — позже добавим в корзину
    alert(`Добавлено: ${product.name} x${quantity}`);
  };

  return (
    <div style={{
      background: '#222',
      padding: '10px',
      borderRadius: '12px',
      color: 'white',
      textAlign: 'center',
      position: 'relative'
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '8px'
        }}
      />
      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
        {product.name}
      </div>
      <div style={{ marginBottom: '8px' }}>{product.price} ₽</div>

      {!showControls ? (
        <button
          onClick={() => setShowControls(true)}
          style={btnStyle}
        >
          🛒 В корзину
        </button>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
            <button onClick={decrement} style={qtyBtn}>−</button>
            <span style={{ margin: '0 12px', fontSize: '16px' }}>{quantity}</span>
            <button onClick={increment} style={qtyBtn}>+</button>
          </div>
          <button
            onClick={handleAdd}
            style={addBtnStyle}
          >
            ✅ Добавить
          </button>
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  background: '#00aaff',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%'
};

const qtyBtn = {
  background: '#444',
  color: 'white',
  border: 'none',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '18px',
  cursor: 'pointer'
};

const addBtnStyle = {
  background: '#00cc66',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%'
};

export default ProductCard;
