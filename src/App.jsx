import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Todo from "./components/todo/todo";
import { useCookies } from "react-cookie";
import {Provider} from "react-redux"
import store from "./redux/store/store";

function App() {

  const [cookies] = useCookies();
  const {loggedIn} = cookies;
  
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={loggedIn === true ? <Todo/> : <Login />} />
        <Route exact path="/dashboard" element={<Todo/>} />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
