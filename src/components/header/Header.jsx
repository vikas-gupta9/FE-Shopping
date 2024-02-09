import { useEffect, useState } from "react";
import "./header.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, getCart } from "../../redux/cartSlice/cartSlice";
import { Link } from "react-router-dom";


const Header = (userData) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const handleCartOpen = () => {
    setCartOpen(true);
  };
  const handleCartClose = () => {
    setCartOpen(false);
  };

  const logout = () => {
    removeCookie("token");
    removeCookie("user_id");
    removeCookie("loggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };


  const handleGetCart = async () => {
    if(loggedIn === true)
    {
    try {
      const response = await fetch("http://localhost:8000/cart/get-cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("data-cartItems", data);
       dispatch(getCart(data))
      }
    } catch (error) {
      console.log(error);
    }
  } else return
  };
  useEffect(() => {
    let delaytime = setTimeout(() =>handleGetCart(),2000)
    return() => {
      clearTimeout(delaytime)
    }
    // handleGetCart();
  }, []);
 

  return (
    <div className="header-container">
      <div className="header-lists">
        <span>Shop</span>
      </div>
      <div className="header-items">
        <div className="header-cart" onClick={handleCartOpen}>
          <span>Cart {cartItems.length}</span>
          {/* <span>Cart {getTotalQuantity() || 0}</span> */}
        </div>
        {cartOpen ? <Cart handleCartClose={handleCartClose} /> : null}
        {loggedIn ? 
          <div className="tooltip">
          User
          <span className="tooltiptext">
            <p className="tooltiptext-text">{userData?.userData?.username}</p>
            <p className="tooltiptext-text" onClick={logout}>
              Sign-Out
            </p>
          </span>
        </div> : <div className="tooltip"><Link to={"/login"}>Login</Link></div>
        }
        
      </div>
    </div>
  );
};

export default Header;
