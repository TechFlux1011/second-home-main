import React, { createContext, useState, useEffect } from 'react';

<<<<<<< HEAD
// Create context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch initial products from the mock API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const addProduct = (product) => {
=======
export let ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  function addProduct(product) {
>>>>>>> origin/main
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};


export default ProductProvider;

