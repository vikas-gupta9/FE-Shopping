import { useEffect, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query"
import { handleLogInQuery } from "../api/LoginApi";


const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [is_active, setIs_active] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const cartItems = useSelector((state) => state.cart.cart);
  const queryClient = new QueryClient()



  const isValidEmail = (value) => {
    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const handleChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleNameBlur = () => {
    if (!loginData.username) {
      setNameError("Please enter username");
      return;
    } else setNameError("");
  };

  const handleEmailBlur = () => {
    if (!loginData.email) {
      setEmailError("Please enter email");
      return;
    } else if (isValidEmail(loginData.email)) {
      setEmailError("");
      return;
    } else {
      setEmailError("Invalid email format");
    }
  };

  const handlePasswordBlur = () => {
    if (!loginData.password) {
      setPasswordError("Please enter password");
    } else if (loginData.password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }
  };
  const handleChangecheckbox = (event) => {
    setIs_active(event.target.checked);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { username, email, password } = loginData;
    const Cred = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        body: JSON.stringify(Cred),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        // handleLogIn();
        toast.success("User registered successfully");
        setIs_active(true);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
 


  const userMutation = useMutation({
    mutationFn: handleLogInQuery,
    onSuccess:(data) => {
      console.log("data",data)
      setCookie("token", data?.accessToken, { path: "/" });
      setCookie("user_id", data?.user_id, { path: "/" });
      setCookie("loggedIn", true, { path: "/" });
      toast.success("User logged in successfully");
      navigate("/");
      // queryClient.invalidateQueries({
      //   queryKey: ['ecom'],
      // })
    }
  })
  const handleLogIn = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    let login = { email: email, password: password };
    userMutation.mutate(login)
  }
  



  return (
    <>
    <div className="login-container">
      <div className="main">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={is_active}
          onChange={handleChangecheckbox}
        />

        <div className="signup">
          <form onSubmit={handleSignIn}>
            <label htmlFor="chk" aria-hidden="true" className="login-label">
              Sign up
            </label>
            <input
             data-testid="username"
              type="text"
              name="username"
              value={loginData?.username}
              placeholder="User name"
              onChange={handleChange}
              required={true}
              onBlur={handleNameBlur}
              className={nameError ? "borderline" : "login-input"}
            />
            {nameError && <div className="error">{nameError}</div>}
            <input
             data-testid="email"
              type="email"
              name="email"
              placeholder="Email"
              value={loginData?.email}
              onChange={handleChange}
              required={true}
              onBlur={handleEmailBlur}
              className={emailError ? "borderline" : "login-input"}
            />
            {emailError && <div className="error">{emailError}</div>}
            <input
             data-testid="password"
              type="password"
              name="password"
              placeholder="Password"
              value={loginData?.password}
              onChange={handleChange}
              required={true}
              onBlur={handlePasswordBlur}
              className={passwordError ? "borderline" : "login-input"}
            />
            {passwordError && <div className="error">{passwordError}</div>}
            <button className="login-button">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogIn}>
            <label htmlFor="chk" aria-hidden="true" className="login-label">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData?.email}
              onChange={handleChange}
              required={true}
              onBlur={handleEmailBlur}
              className={emailError ? "borderline" : "login-input"}
            />
            {emailError && <div className="error">{emailError}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData?.password}
              onChange={handleChange}
              required={true}
              onBlur={handlePasswordBlur}
              className={passwordError ? "borderline" : "login-input"}
            />
            {passwordError && <div className="error">{passwordError}</div>}
            <button  className="login-button">Login</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
