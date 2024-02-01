import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../card/Card";
import Header from "../header/Header";

const Dashboard = () => {
  const [cookies,setCookie ,removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const handleGetDetails = async () => {
    // e.preventDefault();
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
  };
  useEffect(() => {
    handleGetDetails();
  }, []);

  // const logout = (e) => {
  //   e.preventDefault();
  //   removeCookie("token");
  //   removeCookie("user_id");
  //   removeCookie("loggedIn");
  //   toast.success("Logged out successfully");
  //   navigate("/");
  // };

  return (
    <>
    <Header userData={userData} />
    <Card/>
    </>
  );
};

export default Dashboard;
