import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <ProductList />
  </div>
);

export default ProductsPage;
