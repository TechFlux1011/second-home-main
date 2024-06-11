import React from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const { title, description, price, image } = product;

  return (
    <div className="expanded-overlay" onClick={onClose}>
      <div className="expanded-content" onClick={(e) => e.stopPropagation()}>
        <div className="image-container">
          <img src={image} alt={title} className="product-image" />
        </div>
        <div className="details-container">
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <div className="price">${price.toFixed(2)}</div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
