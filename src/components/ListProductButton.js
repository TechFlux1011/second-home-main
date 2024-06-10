import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProductButton.css';

const ListProductButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/list-product');
  };

  return (
    <button className="fab" onClick={handleClick}>
      +
    </button>
  );
};

export default ListProductButton;
