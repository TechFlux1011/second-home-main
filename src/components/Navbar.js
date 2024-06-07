import React, { useContext } from 'react';
import './Navbar.css'; // Import CSS file for styling
import { CartContext } from '../CartContext'; // Import CartContext
import logo from '../logo.jpg'; // Import the logo image

const Navbar = ({ toggleCart, showCart, cart, removeFromCart, getTotalPrice }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Second Home Logo" className="navbar-logo-img" />
        <div className="navbar-title">Second Home</div>
      </div>
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
    </nav>
  );
};

export default Navbar;
