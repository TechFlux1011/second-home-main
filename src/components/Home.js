import React, { useState, useEffect, useContext, useRef } from 'react';
import './Home.css'; // Import CSS file for styling
import { CartContext } from '../CartContext'; // Import CartContext
import Navbar from './Navbar'; // Import Navbar
import { ProductContext } from '../ProductContext'; // Import ProductContext
import ProductDetail from './ProductDetail';
import ListProductButton from './ListProductButton'; // Import the FAB component

const Home = () => {
  const [expandedProduct, setExpandedProduct] = useState(null); // Track the currently expanded product
  const [showCart, setShowCart] = useState(false); // Track cart dropdown visibility
  const { cart, addToCart, removeFromCart } = useContext(CartContext); // Use cart from CartContext
  const { products } = useContext(ProductContext); // Use products from ProductContext
  const expandedContentRef = useRef(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false); // Track description expansion
  const [showReadMore, setShowReadMore] = useState(false); // Track if "Read More" button should be shown
  const [sortOption, setSortOption] = useState('default');
  const [filterOption, setFilterOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (expandedProduct) {
      const descriptionElement = document.querySelector('.expanded-content .description');
      if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
        setShowReadMore(true);
      } else {
        setShowReadMore(false);
      }
    }
  }, [expandedProduct]);

  // Function to handle expanding a product
  const handleExpand = (product) => {
    setExpandedProduct(product);
    setDescriptionExpanded(false); // Reset description expansion when a new product is expanded
    setTimeout(() => {
      const overlayElement = document.querySelector('.expanded-overlay');
      const contentElement = document.querySelector('.expanded-content');
      if (overlayElement) {
        overlayElement.classList.add('show');
      }
      if (contentElement) {
        contentElement.classList.add('show');
      }
    }, 0);
  };

  // Function to handle closing the expanded product
  const handleClose = () => {
    const overlayElement = document.querySelector('.expanded-overlay');
    const contentElement = document.querySelector('.expanded-content');
    if (overlayElement) {
      overlayElement.classList.remove('show');
    }
    if (contentElement) {
      contentElement.classList.remove('show');
    }
    setTimeout(() => {
      setExpandedProduct(null);
    }, 300); // Match the transition duration
  };

  // Function to handle adding item to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
    setShowCart(true); // Show the cart dropdown
  };

  // Function to toggle cart dropdown visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Event listener for clicks outside the expanded content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedContentRef.current && !expandedContentRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (expandedProduct) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedProduct]);

  // Sort products based on selected option
  const sortProducts = (products) => {
    switch (sortOption) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'title-asc':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  // Filter products based on selected category
  const filterProducts = (products) => {
    if (filterOption === 'all') {
      return products;
    }
    return products.filter((product) => product.category === filterOption);
  };

  // Filter products based on search query
  const searchProducts = (products) => {
    return products.filter((product) => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortedAndFilteredProducts = searchProducts(sortProducts(filterProducts(products)));

  return (
    <div className="container">
      <Navbar 
        toggleCart={toggleCart} 
        showCart={showCart} 
        cart={cart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      /> {/* Include Navbar */}
      <div className="header-title-container">
        <h1 className="header-title">Welcome to Second Home</h1>
      </div>
      <div className="tab-bar">
        <button className="tab">Featured Products</button>
        <button className="tab">New Arrivals</button>
        <button className="tab">Best Sellers</button>
      </div>
      <div className='tab-title-container'><h2 className='tab-title'>Featured Products</h2></div>

      <div className="search-sort-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="sort-dropdown" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
        <select className="filter-dropdown" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <option value="all">Filter by category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div className="product-grid">
        {sortedAndFilteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleExpand(product)}
          >
            <img src={product.image} alt={product.title} />
            <div className="price">${product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
      {expandedProduct && (
        <div className="expanded-overlay">
          <div className="expanded-content" ref={expandedContentRef}>
            <div className="image-container">
              <img src={expandedProduct.image} alt={expandedProduct.title} />
            </div>
            <div>
              <h2>{expandedProduct.title}</h2>
              <div className={`description ${descriptionExpanded ? 'collapsed' : ''}`}>
                {expandedProduct.description}
              </div>
              {!descriptionExpanded && showReadMore && (
                <button
                  className="read-more-button"
                  onClick={() => setDescriptionExpanded(true)}
                >
                  Read More...
                </button>
              )}
            </div>
            <div className="add-to-cart-container">
              <div className="price">${expandedProduct.price.toFixed(2)}</div>
              <button className="add-to-cart" onClick={() => handleAddToCart(expandedProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
      <ListProductButton /> {/* Add the FAB component here */}
    </div>
  );
};

export default Home;

