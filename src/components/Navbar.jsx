import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../AuthContext';
import logo from '../logo.jpg';
import cartIcon from '../shopping-cart.png';
import editIcon from '../components/assets/edit-icon.png'
import profile from '../profile.jpg';

const Navbar = ({ toggleCart, showCart, cart, removeFromCart, getTotalPrice }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const handleProfileToggle = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileDropdown(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      toggleCart(false);
    }
  };

  useEffect(() => {
    if (showProfileDropdown || showCart) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showCart]);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Second Home Logo" className="navbar-logo-img" />
        <div className="navbar-title">Second Home</div>
      </div>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="" />
      </div>
      <div className="cart-container">
        {!user ? (
          <button className="auth-button" onClick={() => navigate('/auth')}>Sign Up / Login</button>
        ) : (
          <>
            <button className="profile-button" onClick={handleProfileToggle}>
              <img src={user.profilePhotoUrl || profile} alt="Profile" className="profile-photo" />
            </button>
          </>
        )}
        <button className="cart-button" onClick={toggleCart}>
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <span className="cart-count">{cart.length}</span>
        </button>
        {showCart && (
          <div className="cart-dropdown" ref={cartRef}>
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
        {showProfileDropdown && (
          <div className="profile-dropdown" ref={profileRef}>
            <div className="profile-content">
              <div className="profile-photo" />
              <div className="profile-header">{user.name}</div>
              <div className="profile-info">
                <p>Email: {user.email}</p>
                {/* Add other profile details here */}
              </div>
              <div className="profile-buttons">

                <button onClick={logout}>Logout</button>
              </div>
              <div className='edit-button'>
                <button onClick={() => navigate('/profile/edit')}>
                  <img src= {editIcon} alt="edit" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
