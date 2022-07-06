import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Skeleton from "../components/CakeBlock/Skeleton";

const FullCake = () => {
  const { id } = useParams();
  const [cake, setCake] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCake() {
      try {
        const { data } = await axios.get(
          "https://62b1930ac7e53744afbc2567.mockapi.io/items/" + id
        );
        setCake(data);
      } catch (error) {
        alert("Ошибка при загрузке страницы");
        navigate("/");
      }
    }
    fetchCake();
  }, [id]);

  if (!cake) {
    return <h2 className="fullCake-block__loading">Загрузка...</h2>;
  }

  return (
    <div className="fullCake-block-wrapper">
      <div className="fullCake-block">
        <img className="fullCake-block__image" src={cake.imageUrl} />
        <h2 className="fullCake-block__title">{cake.title}</h2>
        <h4 className="fullCake-block__price">Стоимость: {cake.price} ₴</h4>
      </div>
      <div className="fullCake-block__info">
        <p className="fullCake-block__description"> {cake.description}</p>
        <Link to="/">
          <button className="button button--outline button--add fullCake-block__btn">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullCake;
