// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.thumbnail} alt={product.title} className="product-image" />
    <div className="product-info">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-category">{product.category}</p>
      <div className="product-pricing">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <span className="product-discount">{product.discountPercentage}% off</span>
      </div>
      <Link to={`/product/${product.id}`} className="view-details-link">View Details</Link>
    </div>
  </div>
);

export default ProductCard;
