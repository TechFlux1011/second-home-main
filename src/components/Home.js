import React, { useState, useEffect, useContext, useRef } from 'react';
import './Home.css'; // Import CSS file for styling
import { CartContext } from '../CartContext'; // Import CartContext
import Navbar from './Navbar'; // Import Navbar

const Home = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null); // Track the currently expanded product
  const [showCart, setShowCart] = useState(false); // Track cart dropdown visibility
  const { cart, addToCart, removeFromCart } = useContext(CartContext); // Use cart from CartContext
  const expandedContentRef = useRef(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false); // Track description expansion

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Function to handle expanding a product
  const handleExpand = (product) => {
    setExpandedProduct(product);
    setDescriptionExpanded(false); // Reset description expansion when a new product is expanded
  };

  // Function to handle closing the expanded product
  const handleClose = () => {
    setExpandedProduct(null);
  };

  // Function to handle adding item to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setExpandedProduct(null); // Close the expanded screen
    setShowCart(true); // Show the cart dropdown
  };

  // Function to toggle cart dropdown visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Event listener for clicks outside the expanded content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedContentRef.current && !expandedContentRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (expandedProduct) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedProduct]);

  return (
    <div className="container">
      <Navbar 
        toggleCart={toggleCart} 
        showCart={showCart} 
        cart={cart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      /> {/* Include Navbar */}
      <div className="header-title-container">
        <h1 className="header-title">Welcome to Second Home</h1>
      </div>
      <div className='header-tab-row'>
        <button className='header-tab'><h2>Featured Products</h2></button>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleExpand(product)}
          >
            <img src={product.image} alt={product.title} />
            <div className="price">${product.price}</div>
          </div>
        ))}
      </div>
      {expandedProduct && (
        <div className="expanded-overlay">
          <div className="expanded-content" ref={expandedContentRef}>
            <div className="image-container">
              <img src={expandedProduct.image} alt={expandedProduct.title} />
            </div>
            <div>
              <h2>{expandedProduct.title}</h2>
              <div className={`description ${descriptionExpanded ? 'collapsed' : ''}`}>
                {expandedProduct.description}
              </div>
              {!descriptionExpanded && (
                <button
                  className="read-more-button"
                  onClick={() => setDescriptionExpanded(true)}
                >
                  Read More
                </button>
              )}
            </div>
            <div className="add-to-cart-container">
              <div className="price">${expandedProduct.price}</div>
              <button className="add-to-cart" onClick={() => handleAddToCart(expandedProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
