// src/components/ItemList.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${id}/`);
      setItems((prevItems) => prevItems.filter(item => item.id !== id)); // Update state to remove the deleted item
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Inventory List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Stock-in Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{item.stock_in_date}</td>
              <td>
                {/* Edit button */}
                <Link to={`/update/${item.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                {/* Delete button */}
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/create" className="btn btn-primary mt-3">Add New Product</Link>
    </div>
  );
};

export default ItemList;
