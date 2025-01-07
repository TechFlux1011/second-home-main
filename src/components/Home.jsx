import React, { useState, useEffect, useContext, useRef } from 'react';
import './Home.css';
import { CartContext } from '../CartContext';
import Navbar from './Navbar';
import { ProductContext } from '../ProductContext';
import ListProductButton from './ListProductButton';
import Profile from './Profile';

const Home = () => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { products, setFilteredProducts } = useContext(ProductContext);
  const expandedContentRef = useRef(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [filterOption, setFilterOption] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // New function to handle sorting and filtering
  const getSortedAndFilteredProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (filterOption !== 'all') {
      filtered = filtered.filter(product => product.category === filterOption);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleExpand = (product) => {
    setExpandedProduct(product);
    setDescriptionExpanded(false);
    setTimeout(() => {
      const overlayElement = document.querySelector('.expanded-overlay');
      const contentElement = document.querySelector('.expanded-content');
      if (overlayElement) overlayElement.classList.add('show');
      if (contentElement) contentElement.classList.add('show');
    }, 0);
  };

  const handleClose = () => {
    const overlayElement = document.querySelector('.expanded-overlay');
    const contentElement = document.querySelector('.expanded-content');
    if (overlayElement) overlayElement.classList.remove('show');
    if (contentElement) contentElement.classList.remove('show');
    setTimeout(() => setExpandedProduct(null), 300);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
    setShowCart(true);
  };

  const toggleCart = () => setShowCart(!showCart);

  const toggleProfile = () => setShowProfile(!showProfile);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const sortedAndFilteredProducts = getSortedAndFilteredProducts();

  return (
    <div className="container">
      <Navbar 
        toggleCart={toggleCart} 
        showCart={showCart} 
        cart={cart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        toggleProfile={toggleProfile}
        showProfile={showProfile}
      />
      <div className="header-title-container">
        <h1 className="header-title">Welcome to Second<span>Home</span></h1>
        <h2 className="header-subtitle">Find your missing piece 🧩</h2>
      </div>
      
      <div className="search-sort-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="sort-dropdown" 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default"><a href="https://www.flaticon.com/free-icons/filter" title="filter icons"></a></option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
        <select 
          className="filter-dropdown" 
          value={filterOption} 
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">All Categories</option>
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
              <div className={`description ${descriptionExpanded ? 'expanded' : ''}`}>
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
              <button className="add-to-cart" onClick={() => handleAddToCart(expandedProduct)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ListProductButton />
      {isMobile && showProfile && (
        <div className="expanded-overlay">
          <div className="expanded-content" ref={expandedContentRef}>
            <Profile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;