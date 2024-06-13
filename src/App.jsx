import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import ListProduct from './components/ListProduct';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile'; // Import EditProfile
import Navbar from './components/Navbar';
import AuthProvider from './AuthContext';
import ProductProvider from './ProductContext';

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Navbar 
            cart={cart} 
            toggleCart={toggleCart} 
            showCart={showCart}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            toggleProfile={toggleProfile}
          />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/list-product" element={<ListProduct addToCart={addToCart} />} />
            <Route path="/" element={<Home 
              showProfile={showProfile}
              toggleProfile={toggleProfile}
              showEditProfile={showEditProfile}
              toggleEditProfile={toggleEditProfile}
            />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
