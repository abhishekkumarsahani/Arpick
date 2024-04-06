import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from '../Assets/upload_area.svg'
import Layout from "../Layout/Layout";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "electronics",
    newPrice: "",
    oldPrice: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      // Ensure an image is selected
      if (!image) {
        throw new Error("Image is required.");
      }

      // Upload image
      let formData = new FormData();
      formData.append("image", image); // Use "image" as the key
      const imageResponse = await fetch(
        "https://localhost:44337/api/Image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await imageResponse.json();
      if (!imageResponse.ok) {
        throw new Error(imageData.message);
      }

      // Add product details along with the image URL
      const productData = {
        ...productDetails,
        ImageUrl: imageData.imageUrl, // Use the image URL returned from the server
      };

      const productResponse = await fetch(
        "https://localhost:44337/api/Product/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const responseData = await productResponse.json();
      if (!productResponse.ok) {
        throw new Error(responseData.message);
      }

      alert("Product Added Successfully");
    } catch (error) {
      alert("Failed to add product: " + error.message);
    }
  };

  return (
    <Layout title="Admin-AddProductpage">
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.oldPrice}
            onChange={changeHandler}
            type="text"
            name="oldPrice"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.newPrice}
            onChange={changeHandler}
            type="text"
            name="newPrice"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">ADD</button>
    </div>
    </Layout>
  );
};

export default AddProduct;