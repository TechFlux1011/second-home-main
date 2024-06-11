import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './src/components/Home';
import Auth from './src/components/Auth';
import ListProduct from './src/components/ListProduct';
import Profile from './src/components/Profile';
import Navbar from './src/components/Navbar';
import AuthProvider from './src/AuthContext';
import ProductProvider from './src/ProductContext';

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
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
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Navbar 
            cart={cart} 
            toggleCart={toggleCart} 
            showCart={showCart}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
          />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/list-product" element={<ListProduct addToCart={addToCart} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
