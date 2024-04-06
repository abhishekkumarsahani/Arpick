import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Breadcrums from "../components/Breadcrum/Breadcrum";
import Layout from "../components/Layout/Layout";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <Layout>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
    </Layout>
  );
};

export default Product;
