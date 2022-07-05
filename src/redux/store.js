import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import cakeSlice from "./slices/cakeSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    cakeSlice,
  },
});
