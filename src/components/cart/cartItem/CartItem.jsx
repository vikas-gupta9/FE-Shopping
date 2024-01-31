import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removefromCart } from "../../../redux/cartSlice/cartSlice";
import { getImageURL } from "../../../util/image-util";
import "./cartItem.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";



const CartItem = ({ id, name, description,itemId, color, price,quantity, files }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const dispatch = useDispatch();

const handleRemoveCartItem = async() => {
  try {
    const response = await fetch("http://localhost:8000/cart/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
        id:itemId,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(removefromCart({ id: id }));
      toast.success(data.message)
      console.log("data", data);
    }
  } catch (error) {
    console.log(error);
  }
}

const handleQuantity = async() => {

  try {
    const response = await fetch("http://localhost:8000/cart/update-quantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
        id:itemId,
      },
      body: JSON.stringify({quantity:quantity}),
    });
    const data = await response.json();
    // if (response.ok) {
    //   console.log("data", data);
    // }
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  let delaytime = setTimeout(() => handleQuantity(),2000)
  return() => {
    clearTimeout(delaytime)
  }
  // handleQuantity();
},[quantity])
  
  return (
    <>
      <div className="cart-items-data-container">
        <div className="cart-items-image">
          <img src={getImageURL(files)} alt="image" />
        </div>
        <div className="cart-items-data">
          <div className="cart-items-close-conatiner">
            <div className="cart-items-close">
              <span onClick={() => handleRemoveCartItem()}>
                &nbsp; X
              </span>
            </div>
          </div>
          <div className="cart-items-data-name">
            <div className="cart-items-name">
              <label>{name}</label>
              <span className="cart-items-description">{description}</span>
            </div>
          </div>
          <div className="cart-items-data-name">
            <div className="cart-items-name">
              <label>Color: {color}</label>
            </div>
            <div className="cart-items-quantity">
            <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
          <span>&nbsp;{quantity}&nbsp; </span>
          <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
            </div>
          </div>
          <div className="cart-items-data-price">
          <div>Price:</div>
            <div>${price}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
