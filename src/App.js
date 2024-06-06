import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';

const App = () => (
  <Router>
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Market Maxima</h1>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/create" element={<CreateProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
