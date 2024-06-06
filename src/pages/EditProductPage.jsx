import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, updateLocalProduct, deleteProduct, deleteLocalProduct } from '../features/products/ProductSlice';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  const product = useMemo(() => products.find(product => product.id.toString() === id) || {}, [products, id]);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    published: false,
    ...product
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.id > 100000) {
      dispatch(updateLocalProduct(formData));
    } else {
      await dispatch(updateProduct(formData)).unwrap();
    }
    navigate('/products');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      if (product.id > 100000) {
        dispatch(deleteLocalProduct(product.id));
      } else {
        await dispatch(deleteProduct(product.id)).unwrap();
      }
      navigate('/products');
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Published</label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-4">Update Product</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
