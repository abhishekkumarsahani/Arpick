import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://localhost:44337/api/Product/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch(`https://localhost:44337/api/Product/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchProducts();
    } catch (error) {
      setError('Failed to remove product');
    }
  };

  // Function to handle edit button click
  const handleEdit = (id) => {
    // Navigate to the UpdateProduct page with the product ID
    // You can use template literals to construct the URL
    // Here assuming the route for UpdateProduct is '/updateproduct/:id'
    window.location.href = `/updateproduct/${id}`;
  };
  
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        {allProducts.map((product, index) => (
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.imageUrl} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.oldPrice}</p>
            <p>${product.newPrice}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
            {/* Add edit button with onClick event */}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
