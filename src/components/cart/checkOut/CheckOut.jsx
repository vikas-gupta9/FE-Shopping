import React, { useEffect, useState } from "react";
import "./checkOut.css"

const CheckOut = ({cartItems,handleClose}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Calculate total amount and quantity when the component mounts or cartItems change
  useEffect(() => {
    let total = 0;
    let quantity = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      quantity += item.quantity;
    });

    setTotalAmount(total);
    setTotalQuantity(quantity);
  }, [cartItems]);

  return (
    <>
    <div className="checkout-container">
    <div className="checkout-container-items">
      <label className="checkout-label"><span  onClick={handleClose}>{"<"}&nbsp;</span>&nbsp;Checkout</label>
        {cartItems.map((item) => (
          <React.Fragment key={item.id}>
          <div className="checkout-items">
            <strong>{item.name}</strong>
            <span>Color: {item.color}</span>
            <div className="checkout-price-quantity">
            <span>Quantity: {item.quantity}</span>
            <label>Price: ${item.price}</label>
            </div>
          </div>
          </React.Fragment>
        ))}
      <div className="checkout-bottom-container">
      <div className="checkout-bottom-quantity">
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Amount: $<strong>{totalAmount}</strong></p>
      </div>
      <div className="checkout-bottom-button">
      <span>Proceed for Payment</span>
      </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default CheckOut;
