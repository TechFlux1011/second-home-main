// CustomDropdown.jsx
import React, { useState } from 'react';
import './Home.css'; // Ensure the styles are available here or in a global CSS

const CustomDropdown = ({ label, options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-label" onClick={toggleDropdown}>
        <img className='dropdown-icon' src={label} alt={label}/>
        : {selectedOption.label || "Select an option"}
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
