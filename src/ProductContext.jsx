import React, { createContext, useState, useEffect } from 'react';

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
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

