import { Category } from "../types";

interface Props {
  category: Category;
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: Props) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={category.strCategoryThumb} alt="" />
      <div className="card-title">
        <h3>{category.strCategory}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;