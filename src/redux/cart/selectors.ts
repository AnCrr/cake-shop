import { RootState } from "../store";

export const cartSelector = (state: RootState) => state.cart;
export const cartItemIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: { id: string }) => obj.id === id);
