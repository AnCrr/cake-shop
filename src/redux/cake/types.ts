export type CakeItem = {
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

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface CakeSliceState {
  status: "loading" | "success" | "error";
  items: CakeItem[];
}
