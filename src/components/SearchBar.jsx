import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import { debounce } from 'lodash';
import './ProductList.css';

const SearchBar = () => {
  const { products, setFilteredProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch categories from FakeStoreAPI
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  // Handle search term change with debouncing
  const handleSearchChange = debounce((query) => {
    if (!query) {
      setSuggestions([]);
      setFilteredCategories([]);
      setFilteredProducts(products); // Reset to all products if no search
      return;
    }

    // Filter suggestions for categories and product titles
    const filteredProductTitles = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filteredProductTitles);

    // Create unique suggestions based on product titles and categories
    const categorySuggestions = categories.filter((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(categorySuggestions);

    // Combine matched titles and categories
    const combinedSuggestions = [
      ...new Set([
        ...filteredProductTitles.map((product) => product.title),
        ...categorySuggestions,
      ]),
    ];

    setSuggestions(combinedSuggestions);
  }, 300); // Debounce delay of 300ms

  // Handle the input change
  const handleChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    handleSearchChange(query); // Trigger debounced filtering
  };

  // Handle suggestion click (either a product or a category)
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setFilteredCategories([]);
    filterByCategoryOrProduct(suggestion);
  };

  // Filter products by category or title
  const filterByCategoryOrProduct = (query) => {
    let filtered = [];
    // First check if it's a category match
    if (categories.includes(query.toLowerCase())) {
      filtered = products.filter((product) =>
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // If it's not a category, filter by title
      filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products or categories..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />

      {searchTerm && (
        <ul className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}

          {filteredCategories.length > 0 && (
            <>
              <li className="category-header">Categories</li>
              {filteredCategories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(category)}
                  className="suggestion-item"
                >
                  {category}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
