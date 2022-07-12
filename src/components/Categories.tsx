import React from "react";

type CategoriesProps = {
  activeIndex: number;
  onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeIndex, onChangeCategory }) => {
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
  }
);

export default Categories;
