import {Provider} from "react-redux"
import store from "../redux/store/store";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login"
import { test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"

test(`To test if login input fields are rendered or not `, () => {
    render(
     <Provider store={store}>
      <BrowserRouter>
       <Login/>
       </BrowserRouter>
      </Provider>
    );
  
    const userName = screen.getByTestId("username");
    expect(userName).toBeInTheDocument();
    const email = screen.getByTestId("email");
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId("password");
    expect(password).toBeInTheDocument();

  });


  test(`To test if login input fields takes the user input values or not`, () => {
    render(
        <Provider store={store}>
        <BrowserRouter>
       <Login/>
       </BrowserRouter>
        </Provider>
    );
  
    const userName = screen.getByTestId("username");
    fireEvent.change(userName, { target: { value: "Vikas" } });
    expect(userName.value).toBe("Vikas");
  
    const email = screen.getByTestId("email");
    fireEvent.change(email, { target: { value: "Vikas@g.com" } });
    expect(email.value).toBe("Vikas@g.com");

    const password = screen.getByTestId("password");
    fireEvent.change(password, { target: { value: "user@123" } });
    expect(password.value).toBe("user@123");
  
  });