// OrderDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css"; // Import CSS file for styling
import { useAuth } from "../../../context/auth"; // Import the useAuth hook
import Layout from "../../../components/Layout/Layout";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Get authentication context

  useEffect(() => {
    if (auth && auth.user && auth.user.userId) {
      fetchOrders(auth.user.userId); // Fetch orders if user is authenticated
    }
  }, [auth]); // Execute effect whenever auth changes

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:44337/api/Order/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Layout title="Order-Details">
      <div className="order-details-container">
        <h1 className="order-details-heading">Order Details</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment Status</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.paymentStatus}</td>
                <td>
                  <ul className="product-list">
                    {order.products.map((product) => (
                      <li key={product.id} className="product-item">
                        {product.name} - NPRs{product.newPrice} (Quantity: {product.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrderDetails;
