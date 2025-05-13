// ✅ ProductCard.jsx — карточка товара с кнопкой и количеством
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const existing = cart.find(item => item.id === product.id);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('add');

  useEffect(() => {
    if (existing) {
      setQuantity(existing.quantity);
      setStatus('saved');
    } else {
      setQuantity(1);
      setStatus('add');
    }
  }, [existing]);

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    setStatusFromChange(newQty);
  };

  const decrement = () => {
    const newQty = Math.max(0, quantity - 1);
    setQuantity(newQty);
    setStatusFromChange(newQty);
  };

  const setStatusFromChange = (newQty) => {
    if (!existing && newQty > 0) setStatus('add');
    else if (existing && newQty !== existing.quantity) setStatus('update');
    else if (existing && newQty === existing.quantity) setStatus('saved');
    else if (newQty === 0) setStatus('add');
  };

  const handleAction = () => {
    if (quantity === 0) {
      removeFromCart(product.id);
      setStatus('add');
      setQuantity(1);
      return;
    }

    if (!existing) addToCart(product, quantity);
    else updateQuantity(product.id, quantity);

    setStatus('saved');
  };

  const getButtonText = () => {
    if (status === 'add') return 'Добавить';
    if (status === 'update') return 'Обновить';
    if (status === 'saved') return `✅ В корзине (${quantity} шт.)`;
  };

  const getButtonColor = () => {
    if (status === 'add') return '#007bff';
    if (status === 'update') return '#17a2b8';
    if (status === 'saved') return '#28a745';
  };

  return (
    <div style={{ background: '#222', borderRadius: '16px', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', padding: '12px', boxShadow: '0 0 8px rgba(0,0,0,0.3)' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
      <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '14px' }}>{product.name}</div>
      <div style={{ color: '#ccc', margin: '4px 0 8px', fontSize: '13px' }}>{product.price} ₽</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
        <button onClick={decrement} style={{ width: '28px', height: '28px', background: '#444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '18px', cursor: 'pointer' }}>–</button>
        <span style={{ fontSize: '14px' }}>{quantity}</span>
        <button onClick={increment} style={{ width: '28px', height: '28px', background: '#444', color: 'white', border: 'none', borderRadius: '6px', fontSize: '18px', cursor: 'pointer' }}>+</button>
      </div>
      <button onClick={handleAction} style={{ padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: getButtonColor(), color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
        {getButtonText()}
      </button>
    </div>
  );
};

export default ProductCard;