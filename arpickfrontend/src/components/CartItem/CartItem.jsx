import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);
  const [auth] = useAuth();

  const handleProceedToCheckout = () => {
    if (!auth || !auth.user) {
      // User is not logged in, show a message to login
      toast.error("Please login to check out");
    } else {
      // Proceed to checkout logic here
      // Example: history.push("/checkout");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        const quantity = cartItems[product.id];
        if (quantity > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={product.imageUrl} className="carticon-product-icon" alt={product.name} />
                <p>{product.name}</p>
                <p>NPRs{product.newPrice}</p>
                <button className="cartitems-quantity">{quantity}</button>
                <p>NPRs{product.newPrice * quantity}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(product.id);
                    toast.success("Item Removed from cart");
                  }}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>NPRs{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>NPRs{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button  onClick={handleProceedToCheckout}>
            {!auth || !auth.user ? "LOGIN TO CHECKOUT" : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
