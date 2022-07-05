import React, { useState } from "react";

const Categories = ({ activeIndex, onChangeCategory }) => {
  const CATEGORIES = [
    "Все",
    "Фруктовые",
    "Шоколадные",
    "Многослойные",
    "Порционные",
  ];

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={`${category}_${index}`}
            onClick={() => onChangeCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
