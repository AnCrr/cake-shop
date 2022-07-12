import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart/slice";
import filter from "./filter/slice";
import cake from "./cake/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    cake,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
