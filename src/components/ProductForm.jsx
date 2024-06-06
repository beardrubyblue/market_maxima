import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFormProduct } from '../features/products/ProductSlice';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFormProduct(product));
    setProduct({ name: '', description: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
