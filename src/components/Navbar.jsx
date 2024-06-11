import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../AuthContext';
import logo from '../logo.jpg';
import icon from '../shopping-cart.png';
import profile from '../profile.jpg'

const Navbar = ({ toggleCart, showCart, cart, removeFromCart, getTotalPrice }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Second Home Logo" className="navbar-logo-img" />
        <div className="navbar-title">Second Home</div>
      </div>
      <div className="cart-container">
        {!user ? (
          <button className="auth-button" onClick={() => navigate('/auth')}>Sign Up / Login</button>
        ) : (
          <>
            <button className="profile-button" onClick={() => navigate('/profile')}>
              <img src={user.profilePhotoUrl || profile} alt="Profile" className="profile-photo" />
            </button>
            <button className="list-button" onClick={() => navigate('/list-product')}>List Product</button>
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        )}
        <button className="cart-button" onClick={toggleCart}>
          <img src={icon} alt='Cart' className='cart-icon' />
          <span className="cart-count">{cart.length}</span>
        </button>
        {showCart && (
          <div className="cart-dropdown">
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <span>{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
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
