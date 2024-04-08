import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://localhost:44337/api/Product/relatedproduct")
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Error fetching related products:", error));
  }, []);

  return (
    <div className="popular">
      <h1>Related Products</h1>
      <hr />
      <div className="popular-item">
        {Array.isArray(relatedProducts) && relatedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.imageUrl} // Assuming imageUrl is the correct property name
            newPrice={item.newPrice}
            oldPrice={item.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
