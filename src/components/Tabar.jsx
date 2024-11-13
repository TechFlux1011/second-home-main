import React, {useState, useContext} from 'react'
import Home from './Home';
import { ProductContext } from '../ProductContext';

const Tabar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [sortOption, setSortOption] = useState('default');
    const [filterOption, setFilterOption] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { products } = useContext(ProductContext);
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

    const sortedAndFilteredProducts = searchProducts(sortProducts(filterProducts(products)));

    return (
        <><div className="tab-bar">
            <button className="tab">Featured Products</button>
            <button className="tab">New Arrivals</button>
            <button className="tab">Best Sellers</button>
        </div><div className='tab-title-container'><h2 className='tab-title'>Featured Products</h2></div><div className="sort-filter-container">


                <button className="sort-filter-button" onClick={toggleDropdown}>
                    Filter & Sort
                </button>
                {isExpanded && (
                    <div className="dropdown-content">
                        <div className="dropdown-item">
                            <select id='sort' className="sort-button" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                <option id='1' value="default">Sort by</option>
                                <option id='2' value="price-asc">Price: Low to High</option>
                                <option id='3' value="price-desc">Price: High to Low</option>
                                <option id='4' value="title-asc">Title: A to Z</option>
                                <option id='5' value="title-desc">Title: Z to A</option>

                            </select>
                        </div>

                        <div className="dropdown-item">
                            <select id='filter' className="filter-button" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                                <option value="all">Filter by category</option>
                                <option value="electronics">Electronics</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="women's clothing">Women's Clothing</option>
                            </select>
                        </div>
                    </div>
                )}

            </div></>
    );

};

export default Tabar;