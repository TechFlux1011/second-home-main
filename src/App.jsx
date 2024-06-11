import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import ListProduct from './components/ListProduct';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import AuthProvider from './AuthContext';
import ProductProvider from './ProductContext';
import CartProvider from './CartContext';

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
        <CartProvider>
          <Router basename="/second-home-main">
            <Navbar 
              cart={cart} 
              toggleCart={toggleCart} 
              showCart={showCart}
              removeFromCart={removeFromCart}
              getTotalPrice={getTotalPrice}
            />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/list-product" element={<ListProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
