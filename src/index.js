import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CartProvider from './CartContext.jsx'; // Adjust the import path based on the structure


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
