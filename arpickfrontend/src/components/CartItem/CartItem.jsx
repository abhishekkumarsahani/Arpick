import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import KhaltiCheckout from "khalti-checkout-web";

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    removeAllFromCart,
  } = useContext(ShopContext);
  const [auth] = useAuth();

  const handleProceedToCheckout = () => {
    if (!auth || !auth.user) {
      // User is not logged in, show a message to login
      toast.error("Please login to check out");
    } else {
      // Initialize Khalti Checkout
      var config = {
        publicKey: "test_public_key_f5435ba8f609495cb7487c5a107c9915",
        productIdentity: "your_product_identity",
        productName: "Product Name",
        productUrl: "http://example.com/product-url",
        eventHandler: {
          onSuccess: (payload) => {
            console.log("Payment successful:", payload);
            const productIds = Object.keys(cartItems).filter(productId => cartItems[productId] > 0);
            if (!productIds || productIds.length === 0) {
              toast.error("Product IDs are missing.");
              return;
            }
            removeAllFromCart();
            storeOrderDetails(auth.user.userId, productIds, payload)
              .then(() => {
                window.location.href = "/dashboard/user/orders";
              })
              .catch((error) => {
                console.error("Error storing order details:", error);
                toast.error("Error processing payment");
              });
          },
          onError: (error) => {
            console.error("Payment error:", error);
            toast.error("Payment failed");
          },
          onClose: () => {
            console.log("Payment window closed");
          },
        },
      };
  
      // Create a new instance of Khalti Checkout
      var checkout = new KhaltiCheckout(config);
      checkout.show({ amount: getTotalCartAmount() * 100 });
    }
  };
  
  const storeOrderDetails = (userId, productIds, paymentPayload) => {
    const token = auth.token;
    return fetch(`https://localhost:44337/api/Order/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        productIds: productIds,
        paymentPayload: paymentPayload,
        PaymentStatus: "success",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store order details");
        }
      })
      .catch((error) => {
        console.error("Error storing order details:", error);
        throw error;
      });
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
                <img
                  src={product.imageUrl}
                  className="carticon-product-icon"
                  alt={product.name}
                />
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
          <button onClick={handleProceedToCheckout}>
            {!auth || !auth.user ? "LOGIN TO CHECKOUT" : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
