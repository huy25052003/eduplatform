// src/pages/HomePage.jsx
import React from 'react';
import { products } from '../data/products';

const HomePage = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Danh sách sản phẩm</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()}đ</p>
            <p>{product.shortDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
