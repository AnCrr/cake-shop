import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

import Categories from "../components/Categories";
import SortPopup, { SORT_LIST } from "../components/Sort";
import CakeBlock from "../components/CakeBlock";
import Skeleton from "../components/CakeBlock/Skeleton";
import Pagination from "../components/Pagination";
import { FilterSliceState } from "../redux/filter/types";
import { SearchCakeParams } from "../redux/cake/types";

import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { fetchCakes } from "../redux/cake/asynkActions";
import { cakeSelector } from "../redux/cake/selectors";
import { filterSelector } from "../redux/filter/selectors";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(cakeSelector);

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(filterSelector);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  // const onSetSortType = (type: {
  //   name: string;
  //   sortProperty: string;
  //   order: string;
  // }) => {
  //   console.log("type", type);

  //   dispatch(setSortType(type));
  // };

  const onChangePage = (page: number) => {
    console.log("page", page);

    dispatch(setCurrentPage(page));
  };

  const getCakes = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchCakes({
        sortBy: sortType.sortProperty,
        order: sortType.order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       sortProperty: sortType.sortProperty,
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params);

  //     navigate(`?${queryString}`);
  //   }
  //   //isMounted.current = true;
  //   if (!window.location.search) {
  //     dispatch(fetchCakes({} as SearchCakeParams));
  //   }
  // }, [categoryId, sortType, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchCakeParams;

  //     const sort = SORT_LIST.find((obj) => obj.sortProperty === params.sortBy);
  //     // if (sort) {
  //     //   params.sort = sort;
  //     // }
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sortType: sort || SORT_LIST[0],
  //       })
  //     );
  //     isMounted.current = true;
  //   }
  // }, []);

  useEffect(() => {
    //window.scrollTo(0, 0);

    getCakes();
  }, [categoryId, currentPage, sortType, searchValue]);

  const cakes = items.map((obj: any) => <CakeBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <SortPopup selectedItem={sortType} />
      </div>
      <h2 className="content__title">Все торты</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😱</h2>
          <p>К сожалению, не удалось загрузить торты, попробуйте ещё раз</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : cakes}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

// .filter((obj) => {
//   if (obj.title.toLowerCase().includes(searchValue)) {
//     return true;
//   }
//   return false;
// }) - поиск по статическим данным

// fetch(
//   `https://62b1930ac7e53744afbc2567.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${sortType.order}`
// )
//   .then((res) => res.json())
//   .then((arr) => {
// setItems(arr);
// setIsLoading(false);
//   }); - теперь использую library axios
