import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Add a conditional check for product existence
  if (!product) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.imageUrl} alt="" />
          <img src={product.imageUrl} alt="" />
          <img src={product.imageUrl} alt="" />
          <img src={product.imageUrl} alt="" />
        </div>
        <div className="productDisplay-img">
          <img
            className="productDisplay-main-img"
            src={product.imageUrl}
            alt=""
          />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">
            ${product.oldPrice}
          </div>
          <div className="productDisplay-right-price-new">
            ${product.newPrice}
          </div>
        </div>
        <div className="productDisplay-right-description">
          A lighweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment
        </div>
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>
          <div className="productDisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
            toast.success("Item Added to cart");
          }}
        >
          ADD TO CART
        </button>
        <p className="productDisplay-right-category">
          <span>Category :</span>Women, T-Shirt, Crop Top
        </p>
        <p className="productDisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
