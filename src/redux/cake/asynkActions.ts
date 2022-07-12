import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CakeItem, SearchCakeParams } from "./types";

export const fetchCakes = createAsyncThunk<CakeItem[], SearchCakeParams>(
  "cake/fetchCakesStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<CakeItem[]>(
      `https://62b1930ac7e53744afbc2567.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
