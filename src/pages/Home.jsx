import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { SORT_LIST } from "../components/Sort";
import CakeBlock from "../components/CakeBlock";
import Skeleton from "../components/CakeBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchCakes } from "../redux/slices/cakeSlice";
import { cakeSelector } from "../redux/slices/cakeSlice";
import { filterSelector } from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(cakeSelector);

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(filterSelector);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onSetSortType = (type) => {
    dispatch(setSortType(type));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
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
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = SORT_LIST.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortType: sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    getCakes();
  }, [categoryId, currentPage]);

  const cakes = items.map((obj) => <CakeBlock key={obj.id} {...obj} />);
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
        <Sort selectedItem={sortType} onChangeSort={onSetSortType} />
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
