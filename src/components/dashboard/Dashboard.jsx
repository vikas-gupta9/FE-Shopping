import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../card/Card";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/cartSlice/cartSlice";
import {useQuery, useMutation} from "@tanstack/react-query"
import { getLoginUsers } from "../../api/LoginApi";



const Dashboard = () => {
  const [cookies,setCookie ,removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);



  const handleCart =  () => {
   if(loggedIn === true && cartItems.length > 0){
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

  
  const getDetailsQuery = useQuery(
    { queryKey: ['ecom'],
     queryFn:() =>  loggedIn ? getLoginUsers(auth) : null
     })

// useEffect(() => {
//   if(!getDetailsQuery?.isLoading && !getDetailsQuery?.isError) setUserData(getDetailsQuery?.data)
// }, [getDetailsQuery?.isLoading,getDetailsQuery?.isError,getDetailsQuery?.data]);



  return (
    <>
    <Header userData={getDetailsQuery?.data} />
    <Card/>
    </>
  );
};

export default Dashboard;
