import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import './ProductList.css';

const ProductList = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 10).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
