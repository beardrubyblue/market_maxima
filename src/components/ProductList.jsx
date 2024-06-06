import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteLocalProduct, deleteProduct } from '../features/products/ProductSlice';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [tab, setTab] = useState('api');
  const [publishedOnly, setPublishedOnly] = useState(false);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts(8));
  }, [dispatch]);

  const handleDelete = (id, isLocal) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      if (isLocal) {
        dispatch(deleteLocalProduct(id));
      } else {
        dispatch(deleteProduct(id));
      }
    }
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
    setLocalProducts(storedProducts);
  }, []);

  const filteredProducts = localProducts.filter(product => !publishedOnly || product.published);

  const togglePublished = (id) => {
    const updatedProducts = localProducts.map(product => {
      if (product.id === id) {
        return { ...product, published: !product.published };
      }
      return product;
    });
    setLocalProducts(updatedProducts);
    localStorage.setItem('localProducts', JSON.stringify(updatedProducts));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading products.</p>;
  }

  return (
    <div>
      <div className="mb-4">
      <Link to="/create" className="bg-green-500 text-white p-2 rounded mr-2">
          Create New Product
        </Link>
        <button
          onClick={() => dispatch(fetchProducts(8))}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Load 8 Products
        </button>
        <button
          onClick={() => dispatch(fetchProducts(16))}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Load 16 Products
        </button>
        <button
          onClick={() => dispatch(fetchProducts(20))}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Load All Products
        </button>
      </div>

      <div className="mb-4">
        <button onClick={() => setTab('api')} className={`p-2 rounded mr-2 ${tab === 'api' ? 'bg-gray-300' : ''}`}>API Products</button>
        <button onClick={() => setTab('local')} className={`p-2 rounded ${tab === 'local' ? 'bg-gray-300' : ''}`}>Local Products</button>
      </div>

      {tab === 'api' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {tab === 'local' && (
        <div>
          <div className="mb-4">
            <label>
              <input type="checkbox" checked={publishedOnly} className='mx-1' onChange={() => setPublishedOnly(!publishedOnly)} />
                 Published Only
            </label>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Published</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.title}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">{product.description}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={product.published}
                      onChange={() => togglePublished(product.id)}
                    />
                  </td>
                  <td className="border p-2">
                    <Link to={`/edit/${product.id}`} className="bg-blue-500 text-white px-3 py-2 rounded">Edit</Link>
                    <button onClick={() => handleDelete(product.id, product.id > 100000)} className="bg-red-500 text-white px-3 py-1 mx-2 rounded">
                        Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
