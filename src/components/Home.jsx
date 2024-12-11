import React, { useMemo, useState, useEffect, useContext, useRef } from 'react';
import './Home.css';
import { CartContext } from '../CartContext';
import Navbar from './Navbar';
import { ProductContext } from '../ProductContext';
import ListProductButton from './ListProductButton';
import Profile from './Profile';
import CustomDropdown from './CustomDropdown';
import 'ui-neumorphism/dist/index.css';




const Home = () => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const expandedContentRef = useRef(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleExpand = (product) => {
    setExpandedProduct(product);
    setDescriptionExpanded(false);
    requestAnimationFrame(() => {
      const overlayElement = document.querySelector('.expanded-overlay');
      const contentElement = document.querySelector('.expanded-content');
      if (overlayElement) {
        overlayElement.classList.add('show');
      }
      if (contentElement) {
        contentElement.classList.add('show');
      }
    });
  };

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
    }, 300);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
    setShowCart(true);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedContentRef.current !== null && !expandedContentRef.current.contains(event.target)) {
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

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };


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

  const filterProducts = (products) => {
    if (filterOption === 'all') {
      return products;
    }
    return products.filter((product) => product.category === filterOption);
  };

  const searchProducts = (products) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortOptions = [
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Title: A to Z", value: "title-asc" },
    { label: "Title: Z to A", value: "title-desc" },
  ];

  const filterOptions = [
    { label: "All Categories", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  const sortedAndFilteredProducts = useMemo(() => {
    return searchProducts(sortProducts(filterProducts(products)));
  }, [products, sortOption, filterOption, searchQuery]);

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
        <h2 className='header-subtitle'>Find your missing piece 🧩</h2>
      </div>
      <div className="tab-bar">
        <button className="tab">Featured Products</button>
        <button className="tab">New Arrivals</button>
        <button className="tab">Best Sellers</button>
      </div>

      <div className="sort-filter-container">
        <CustomDropdown
          label="Sort"
          options={sortOptions}
          selectedOption={sortOption}
          onOptionSelect={setSortOption}
        />
        <CustomDropdown
          label="Filter by"
          options={filterOptions}
          selectedOption={filterOption}
          onOptionSelect={setFilterOption}
        />
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
              <div className={`description ${descriptionExpanded ? 'expanded' : ''}`}>
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


