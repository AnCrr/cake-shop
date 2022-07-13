import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CartItem } from "../../redux/cart/types";
import { cartItemIdSelector } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";

const TYPE_NAMES = ["обычный", "веганский"];

type CakeBlockProps = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};

export const CakeBlock: React.FC<CakeBlockProps> = ({
  id,
  title,
  types,
  sizes,
  price,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemIdSelector(id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : "0";

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: TYPE_NAMES[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="cake-block-wrapper">
      <div className="cake-block">
        <Link to={`/cake/${id}`}>
          <img className="cake-block__image" src={imageUrl} alt="Cake" />
          <h4 className="cake-block__title">{title}</h4>
        </Link>
        <div className="cake-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => setActiveType(type)}
                key={`${type}_${index}`}
                className={activeType === type ? "active" : ""}
              >
                {TYPE_NAMES[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                key={`${size}_${index}`}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="cake-block__bottom">
          <div className="cake-block__price">от {price} ₴</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
