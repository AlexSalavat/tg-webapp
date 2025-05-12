import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductList = ({ categoryId, onBack }) => {
  const filtered = products.filter(p => p.categoryId === categoryId);

  return (
    <div style={{ padding: '20px', background: '#111', color: 'white' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
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
      <h2 style={{ marginBottom: '10px' }}>Товары</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '12px',
          justifyContent: 'center'
        }}
      >
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
