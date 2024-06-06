import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
      const localProduct = localProducts.find((p) => p.id === parseInt(id));

      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className='flex justify-center'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='p-10 flex flex-col w-50px justify-center border rounded-md shadow-md items-center'>
          <img src={product.image} alt={product.title} className="h-35 w-20 object-cover mb-10" />
          <div className='w-2/4'>
            <h2 className="text-lg font-bold mb-3">{product.title}</h2>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="mb-2">Description: {product.description}</p>
            <p className="mb-2">Category: {product.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
