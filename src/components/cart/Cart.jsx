import React, { useState } from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/CartItem";
import CheckOut from "./checkOut/CheckOut";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



const Cart = ({ handleCartClose }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const navigate = useNavigate();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  console.log("data",cartItems )

  const handleCheckout = () => {
    !loggedIn ? navigate("/login") : setCheckoutOpen(true);
  };
  return (
    <div className="cart-container">
      <label className="close-cart" onClick={handleCartClose}>
        X
      </label>
      <div className="cart-header">
        <span>Your bag</span>
        <span>{cartItems.length} items</span>
        {/* <span>{getTotalQuantity() || 0} items</span> */}
      </div>
      files
      {!checkoutOpen ? (
        <>
          <div className="cart-item-container">
            <div className="cart-items">
              {cartItems.map((items) => (
                <React.Fragment key={items?._id}>
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
                </React.Fragment>
               
              ))}
            </div>
          </div>
          <div className="Checkout-container">
            <span onClick={handleCheckout}>Checkout</span>
          </div>
        </>
      ) : (
        <CheckOut
          cartItems={cartItems}
          handleClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;
