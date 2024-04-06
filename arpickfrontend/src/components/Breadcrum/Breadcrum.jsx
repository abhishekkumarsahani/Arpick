import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrums = (props) => {
  const { product } = props;

  // Add a conditional check for product existence
  if (!product) {
    return null; // Or you can render a loading indicator or placeholder text
  }

  return (
    <div className="breadcrum">
      Home
      <img src={arrow_icon} alt="" /> {product.category}{" "}
      <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrums;
