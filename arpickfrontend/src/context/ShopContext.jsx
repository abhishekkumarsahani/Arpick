import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import toast from "react-hot-toast"; // Import toast for displaying messages

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [auth, setAuth] = useAuth();
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    return savedCartItems || getDefaultCart();
  });

  useEffect(() => {
    fetch("https://localhost:44337/api/Product/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (productId) => {
    // Check if the current quantity in the cart exceeds 10
    if (cartItems[productId] >= 10) {
      toast.error("Cannot add more than 10 quantities of the same product.");
      return;
    }

    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productId]: (prevCartItems[productId] || 0) + 1,
    }));

    // Update cart in localStorage
    updateCartInLocalStorage(productId, cartItems[productId] + 1);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const updatedQuantity = (updatedCartItems[productId] || 0) - 1;
      if (updatedQuantity >= 0) {
        updatedCartItems[productId] = updatedQuantity;
        // Update cart in localStorage
        updateCartInLocalStorage(productId, updatedQuantity);
        return updatedCartItems;
      }
      return prevCartItems;
    });
  };

  const updateCartInLocalStorage = (productId, quantity) => {
    const userId = auth?.user?.userId;
    const cartData = JSON.parse(localStorage.getItem("cartItems")) || {};
    const updatedCart = { ...cartData, [userId]: { ...cartData[userId], [productId]: quantity } };
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(productId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.newPrice * cartItems[productId];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        totalItem += cartItems[productId];
      }
    }
    return totalItem;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
