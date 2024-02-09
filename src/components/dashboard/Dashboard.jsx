import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../card/Card";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/cartSlice/cartSlice";



const Dashboard = () => {
  const [cookies,setCookie ,removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);



  const handleCart =  () => {
    console.log("handleCart")
   if(loggedIn === true){
    cartItems.map(async(item) =>  {
      console.log("storage", item)

        try {
      const response = await fetch("http://localhost:8000/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
          id: item?.id,
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("cart-login-data", data);
        // let array =[]
        // return dispatch(addtoCart(array));
      }
    } catch (error) {
      console.log(error);
    }
    })
  } else return
  };
  
  useEffect(() => {
    handleCart();
  }, []);




  const handleGetDetails = async () => {
    if(loggedIn === true)
    {
    try {
      const response = await fetch("http://localhost:8000/users/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("data", data);
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  } else return
  };
  useEffect(() => {
   handleGetDetails();
  }, []);


  return (
    <>
    <Header userData={userData} />
    <Card/>
    </>
  );
};

export default Dashboard;
