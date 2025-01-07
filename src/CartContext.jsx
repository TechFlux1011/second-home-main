import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };
  
  const updateCartItem = (index, quantity) => {
    setCart((prevCart) => prevCart.map((item, i) => i === index ? { ...item, quantity } : item));
  };
  
  

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const getTotalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  }, [cart]);
  

  return (
    <CartContext.Provider value={{ cart, toggleCart, showCart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
