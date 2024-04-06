import React from "react";
import CartItem from "../components/CartItem/CartItem";
import Layout from "../components/Layout/Layout";

const Cart = () => {
  return (
    <Layout title="Cart Page - Arpick Logistics">
      <div>
        <CartItem />
      </div>
    </Layout>
  );
};

export default Cart;
