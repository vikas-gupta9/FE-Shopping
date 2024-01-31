import React from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/CartItem";

const Cart = ({ handleCartClose }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <div className="cart-container">
      <label className="close-cart" onClick={handleCartClose}>
        X
      </label>
      <div className="cart-header">
        <span>Your bag</span>
        {/* <span>{cartItems.length} items</span> */}
        <span>{getTotalQuantity() || 0} items</span>
      </div>files
      <div className="cart-item-container">
        <div className="cart-items">
          {cartItems.map((items) => (
            <CartItem
              key={items?._id}
              id={items?.id}
              itemId={items?._id}
              name={items?.name}
              description={items?.description}
              color={items?.color}
              price={items?.price}
              files={items?.files}
              quantity={items?.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
