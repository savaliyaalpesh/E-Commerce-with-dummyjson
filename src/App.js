import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './Component/List/List';
import Product from './Component/Product/Product';
import Header from './Component/Header/Header';
import Cart from './Component/cart/Cart';
import './App.css';

function App() {
  const [search, setSearch] = useState ('');

  return (
    <div>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<List search={search} />} />
        <Route path="/Search/:query" element={<List search={search} />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
