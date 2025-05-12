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
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
