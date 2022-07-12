import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCakes } from "./asynkActions";
import { CakeItem, CakeSliceState, Status } from "./types";

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

export const { setItems } = cakeSlice.actions;

export default cakeSlice.reducer;
