import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type CakeItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export type SearchCakeParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface CakeSliceState {
  status: "loading" | "success" | "error";
  items: CakeItem[];
}

export const fetchCakes = createAsyncThunk<CakeItem[], SearchCakeParams>(
  "cake/fetchCakesStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    //console.log(order);
    const { data } = await axios.get<CakeItem[]>(
      `https://62b1930ac7e53744afbc2567.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState: CakeSliceState = {
  items: [],
  status: Status.LOADING,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CakeItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCakes.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCakes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCakes.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const cakeSelector = (state: RootState) => state.cakeSlice;

export const { setItems } = cakeSlice.actions;

export default cakeSlice.reducer;
