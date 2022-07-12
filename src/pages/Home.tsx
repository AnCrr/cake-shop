import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

import Categories from "../components/Categories";
import SortPopup from "../components/Sort";
import CakeBlock from "../components/CakeBlock";
import Skeleton from "../components/CakeBlock/Skeleton";
import Pagination from "../components/Pagination";

import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchCakes } from "../redux/cake/asynkActions";
import { cakeSelector } from "../redux/cake/selectors";
import { filterSelector } from "../redux/filter/selectors";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(cakeSelector);
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(filterSelector);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
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

  useEffect(() => {
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
