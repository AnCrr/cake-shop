import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCakes = createAsyncThunk(
  "cake/fetchCakesStatus",
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://62b1930ac7e53744afbc2567.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
//&limit=4

const initialState = {
  items: [],
  status: "loading",
};

export const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchCakes.pending]: (state, action) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchCakes.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succes";
    },
    [fetchCakes.rejected]: (state, action) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const cakeSelector = (state) => state.cakeSlice;

export const { setItems } = cakeSlice.actions;

export default cakeSlice.reducer;
