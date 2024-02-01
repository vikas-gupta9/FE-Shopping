import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import {Provider} from "react-redux"
import store from "./redux/store/store";
import Dashboard from "./components/dashboard/Dashboard";

function App() {

  const [cookies] = useCookies();
  const {loggedIn} = cookies;
  
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={loggedIn === true ? <Dashboard/> : <Login />} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
