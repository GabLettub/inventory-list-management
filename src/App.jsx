import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="space-x-4">
          <Link to="/" className="text-blue-500">Home</Link>
          <Link to="/create" className="text-blue-500">Create Product</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
