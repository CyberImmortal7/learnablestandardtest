import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CartPage.css';
import master from '../assets/mastercard.png';
import visa from '../assets/visa.png';
import pay from '../assets/paystack.png';
import { incrementQuantity, decrementQuantity, removeItem, loadFromLocalStorage } from '../features/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="cart-page">
      <header className="header">
        <div className="header-top">
          <div className="contact-info">
            <p>(225) 555-0118 | michelle.rivera@example.com</p>
          </div>
          <div className="promo-info">
            <p>Follow Us and get a chance to win 80% off</p>
          </div>
         
        </div>
        <div className="header-bottom">
          <h1>Bandage</h1>
          <nav>
            <Link to="/">Home</Link>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
            <a href="#">Pages</a>
          </nav>
          <div className="auth-links">
            <a href="#">Login / Register</a>
            <a href="#">Cart</a>
          </div>
        </div>
      </header>

      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-items-header">
            <div className="item-details-header">Item Details</div>
            <div className="quantity-header">Quantity</div>
            <div className="price-header">Price</div>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>{item.availabilityStatus}</p>
                <p className="stars">⭐⭐⭐⭐⭐ <span className="review-count">28 Reviews</span></p>
                <button onClick={() => dispatch(removeItem(item.id))} className="remove-button">REMOVE</button>
              </div>
              <div className="quantity">
                <button onClick={() => dispatch(decrementQuantity(item.id))} className="quantity-button">-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))} className="quantity-button">+</button>
              </div>
              <div className="price">
                ${(item.price * item.quantity).toFixed(2)}
                <br />
                <span className="item-price">${item.price.toFixed(2)} x {item.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>{cartItems.length} Items</p>
          <p>Delivery Charges: <span className="delivery-note">Add your delivery address to checkout to see delivery charges.</span></p>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)} <span className="excluding-note">Excluding Delivery Charges</span></p>
          <button className="checkout-button">Proceed to Checkout</button>
          <div className="payment-methods">
            <img src={pay} alt="Paystack" />
            <img src={visa} alt="Visa" />
            <img src={master} alt="MasterCard" />
          </div>
        </div>
      </div>
      <section className='related-items'>

      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company Info</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li><a href="#">Business Marketing</a></li>
              <li><a href="#">User Analytic</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">Unlimited Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">IOS & Android</a></li>
              <li><a href="#">Watch a Demo</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
        <p className="footer-bottom-text">Made With Love By Finland All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default CartPage;
