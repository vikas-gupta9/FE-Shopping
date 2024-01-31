import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
