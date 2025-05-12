import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductList = ({ categoryId, onBack }) => {
  const filtered = products.filter(p => p.categoryId === categoryId);

  return (
    <div style={{ padding: '16px', background: '#111', color: 'white', minHeight: '100vh' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '16px',
          padding: '8px 16px',
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Назад
      </button>
      <h2 style={{ marginBottom: '16px' }}>Товары</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}
      >
        {filtered.length > 0 ? (
          filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 10px',
              color: '#aaa',
              fontSize: '15px',
              lineHeight: '1.5'
            }}
          >
            🚚 <strong>Товар уже в пути...</strong> <br />
            Скоро появятся новинки, которые тебя точно удивят 😉
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
