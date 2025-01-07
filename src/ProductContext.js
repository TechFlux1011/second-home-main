import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Set filtered products initially to all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <ProductContext.Provider value={{ products, filteredProducts, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
