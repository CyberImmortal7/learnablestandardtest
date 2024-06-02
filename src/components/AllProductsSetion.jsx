import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/apiSlice';
import ProductCard from './ProductCard';
import '../styles.css';
import book from '../assets/book.svg';
import open from '../assets/open.png';
import chart from '../assets/chart.png';
import feat from '../assets/featured-posts.png';
import review from '../assets/testimonial.png';
import buzz from '../assets/call.png';
import cartpic from '../assets/cartlogo.png';
import div from '../assets/div.png';
import login from '../assets/loginlogo.png';
import mail from '../assets/maillogo.png';

const AllProductsSection = () => {
  const [page, setPage] = useState(1);
  const limit = 10; 
  const { data, error, isLoading } = useGetProductsQuery({ page, limit });

  return (
    <div>
      <header className="header">
        <div className="header-top">
          <div className="contact-info">
            <p>(225) 555-0118 &nbsp;</p>
            <p>   <img src={mail} alt="Mail-logo" />
                      michelle.rivera@example.com</p>
          </div>
          <div className="promo-info">
            <p>Follow Us and get a chance to win 80% off</p>
          </div>
          
        </div>
        <div className="header-bottom">
          <h1>Bandage</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/pages">Pages</Link>
          </nav>
          <div className="auth-links">
            <Link to="/login">
              <img src={login} alt="Sign-up/Login" />
            </Link>
            <Link to="/cart">
              <img src={cartpic} alt="Cart Logo" />
            </Link>
          </div>
        </div>
      </header>

      <section className="home-page">
        <div className="banner">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading banner images.</p>
          ) : (
            data.products.slice(0, 4).map((product, index) => (
              <div className={`banner-item ${index === 0 ? 'large' : index === 1 ? 'medium' : 'small'}`} key={product.id}>
                <img src={product.thumbnail} alt={product.name} />
               
              </div>
            ))
          )}
        </div>
      </section>

      <section className="products-section">
        <h2>Featured Products</h2>
        <p>Bestseller Products</p>
        <p>Problems trying to resolve the conflict between...</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products.</p>
        ) : (
          <div className="product-list">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="pagination">
          <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={data && data.products.length < limit}>
            Next
          </button>
        </div>
      </section>
      <section className="best-services">
        <h2>The Best Services</h2>
        <div className="services">
          <div className="service">
            <img src={open} alt="Easy Wins" />
            <h3>Easy Wins</h3>
            <p>Get your best looking smile today!</p>
          </div>
          <div className="service">
            <img src={book} alt="Concrete" />
            <h3>Concrete</h3>
            <p>Defaults to making your most beautiful smile.</p>
          </div>
          <div className="service">
            <img src={chart} alt="Hack Growth" />
            <h3>Hack Growth</h3>
            <p>Overcomes any hurdle or any other problem.</p>
          </div>
        </div>
      </section>

      <section className="featured-posts">
        <img src={feat} alt="Featured Posts" />
      </section>

      <section className="they-say">
        <img src={review} alt="Testimonials" />
      </section>

      <section className="call-us">
        <img src={buzz} alt="Call Us" />
      </section>

      <br/>
      
      <section className='bandage'>
        <img src={div} alt="div-bandage" />
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company Info</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/hiring">We are hiring</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/legal">Abous Us</Link></li>
              <li><Link to="/privacy">Carrier</Link></li>
              <li><Link to="/hire">We are hiring</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li><Link to="/marketing">Business Marketing</Link></li>
              <li><Link to="/analytics">User Analytics</Link></li>
              <li><Link to="/chat">Live Chat</Link></li>
              <li><Link to="/support">Unlimited Support</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/ios-android">IOS & Android</Link></li>
              <li><Link to="/demo">Watch a Demo</Link></li>
              <li><Link to="/customers">Customers</Link></li>
              <li><Link to="/api">API</Link></li>
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

export default AllProductsSection;
