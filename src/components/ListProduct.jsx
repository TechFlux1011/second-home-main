import React, { useState, useContext } from 'react';
import './ListProduct.css'; // Import CSS for styling
import { ProductContext } from '../ProductContext';

const ListProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      category,
      image: URL.createObjectURL(images[0]), // Use the first image as the main image
    };
    addProduct(newProduct);

    // Reset the form
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImages([]);
    setMessage('Product listed successfully!');
  };

  return (
    <div className="list-product-container">
      <h2>List a New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">List Product</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ListProduct;
