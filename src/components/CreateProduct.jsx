// src/components/CreateProduct.jsx
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
    stock_in_date: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/items/', newProduct);
      navigate('/'); // Redirect to home after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock_in_date" className="form-label">Stock-in Date</label>
          <input
            type="date"
            id="stock_in_date"
            name="stock_in_date"
            value={newProduct.stock_in_date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
