export enum SortPropertyEnum {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  order: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: Sort;
}
