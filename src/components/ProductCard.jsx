import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Link className="bg-white border p-4 rounded-md shadow-md" to={`/products/${product.id}`}>
    <div>
      <img src={product.image} alt={product.title} className="h-32 w-full object-contain mb-4" />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
    </div>
  </Link>
);

export default ProductCard;
