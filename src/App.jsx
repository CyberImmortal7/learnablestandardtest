// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsSection from './components/AllProductsSetion';
import ProductDetailsSection from './components/ProductDetailsSection';
import CartPage from './components/CartPage';

const App = () => (
  <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={<AllProductsSection />} />
        <Route path="/product/:productId" element={<ProductDetailsSection />} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
    </div>
  </Router>
);

export default App;
