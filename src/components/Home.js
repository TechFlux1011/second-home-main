import React, { useState, useEffect, useContext } from 'react';
import './Home.css'; // Import CSS file for styling
import { CartContext } from '../CartContext'; // Import CartContext

const Home = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null); // Track the currently expanded product
  const [showCart, setShowCart] = useState(false); // Track cart dropdown visibility
  const { cart, addToCart, removeFromCart } = useContext(CartContext); // Use cart from CartContext

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Function to handle expanding a product
  const handleExpand = (product) => {
    setExpandedProduct(product);
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

  return (
    <div className="container">
      <div className="cart-container">
        <button className="cart-button" onClick={toggleCart}>
          View Cart
          <span className="cart-count">{cart.length}</span> {/* Use cart length */}
        </button>
        {showCart && (
          <div className="cart-dropdown">
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <span>{item.title}</span>
                    <span>${item.price}</span>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total: ${getTotalPrice()}</span>
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        )}
      </div>
      <h1>Welcome to Second Home</h1>
      <h2>Featured Products</h2>
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
          <div className="expanded-content">
            <button className="close-button" onClick={handleClose}>X</button>
            <div className="image-container">
              <img src={expandedProduct.image} alt={expandedProduct.title} />
            </div>
            <div>
              <h2>{expandedProduct.title}</h2>
              <p>{expandedProduct.description}</p>
            </div>
            <button className="add-to-cart" onClick={() => handleAddToCart(expandedProduct)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
