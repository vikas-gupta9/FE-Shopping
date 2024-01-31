import {Provider} from "react-redux"
import store from "../redux/store/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Card from "../components/card/Card"
import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"

test(`To test if Card fields are rendered or not `, () => {
    render(
     <Provider store={store}>
      <BrowserRouter>
        <Card/>
        </BrowserRouter>
      </Provider>
    );
  
    const filter = screen.getByTestId("Filter");
    expect(filter).toBeInTheDocument();
    const sort = screen.getByTestId("Sort by");
    expect(sort).toBeInTheDocument("Sort by");

  });