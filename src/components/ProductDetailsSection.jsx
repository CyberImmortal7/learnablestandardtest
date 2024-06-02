import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useGetProductQuery } from '../features/apiSlice';
import { addToCart } from '../features/cartSlice';
import './ProductDetailsSection.css';
import notworking from '../assets/notworking.png';
import stripe from '../assets/strip.png';
import div from '../assets/div.png';


const ProductDetailsSection = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductQuery(productId);
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBestsellerProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setBestsellerProducts(response.data.products);
        setVisibleProducts(response.data.products.slice(0, 6)); // Show initial 2 rows (3 items each)
      } catch (error) {
        console.error('Error fetching bestseller products:', error);
      }
    };

    fetchBestsellerProducts();
  }, []);

  const handleViewMore = () => {
    setShowAll(true);
    setVisibleProducts(bestsellerProducts); // Show all products
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart({ ...data, image: data.images[0] }));
      setPopupData({ image: data.images[0], price: data.price });
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="product-details-page">
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
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </header>

      <section className="product-details-section">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading product details.</p>
        ) : (
          <div className="product-details-container">
            <div className="breadcrumb">
              <Link to='/'>Home</Link> &gt; <a href="#">Shop</a> &gt; {data.title}
            </div>
            <div className="product-main-info">
              <div className="product-image">
                <img
                  src={data.images[currentImage]}
                  alt={data.title}
                  className="main-product-image"
                />
                <div className="thumbnail-container">
                  {data.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${data.title} thumbnail ${index + 1}`}
                      className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="product-summary">
                <h2>{data.title}</h2>
                <div className="product-reviews">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="review-count">10 Reviews</span>
                </div>
                <p className="product-price">${data.price}</p>
                <p className="product-availability">
                  Availability: <span className="in-stock">In Stock</span>
                </p>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="product-tabs">
              <ul className="tabs">
                <li className="tab">Description</li>
                <li className="tab">Additional Information</li>
                <li className="tab">Reviews (0)</li>
              </ul>
              <div className="tab-content">
                <p>{data.description}</p>
              </div>
            </div>

            <section className="not-working">
              <img src={notworking} alt="No Function" />
            </section>

            <section className="bestseller-products">
              <h2>Bestseller Products</h2>
              <div className="products-grid">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.thumbnail} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                  </div>
                ))}
              </div>
              {!showAll && bestsellerProducts.length > 5 && (
                <button className="view-more-button" onClick={handleViewMore}>
                  View More
                </button>
              )}
            </section>
          </div>
        )}
      </section>

      <section className="stripe">
        <img src={stripe} alt="Strip" />
      </section>
      <br/>
      <section className='div'>
      <img src={div} alt="Strip" />

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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={handleClosePopup}>×</button>
            <h3>Successfully added to basket</h3>
            {popupData && (
              <div className="popup-details">
                <img src={popupData.image} alt="Product" />
                <p>${popupData.price}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsSection;
