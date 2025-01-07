import React, { useState } from 'react';

const SearchBar = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = () => {
    let filteredProducts = products;

    if (filterOption !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === filterOption);
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'price-asc':
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filteredProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    onSearch(filteredProducts);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        {/* Add more categories as needed */}
      </select>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort By</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
        <option value="title-asc">Title Ascending</option>
        <option value="title-desc">Title Descending</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;