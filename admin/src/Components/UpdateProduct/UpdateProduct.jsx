import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import upload_area from '../../assets/upload_area.svg';
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    newPrice: "",
    oldPrice: "",
    imageUrl: ""
  });

  useEffect(() => {
    // Fetch existing product details
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://localhost:44337/api/Product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:44337/api/Product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetails)
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      // Product updated successfully, navigate to the product list page
      navigate('/products');
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="update-product">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="newPrice">New Price</label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            value={productDetails.newPrice}
            onChange={handleInputChange}
            placeholder="Enter new price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPrice">Old Price</label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={productDetails.oldPrice}
            onChange={handleInputChange}
            placeholder="Enter old price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          <img src={productDetails.imageUrl || upload_area} alt="Product" className="thumbnail-img" />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
