interface Props {
  ingredient: string;
  onClick: () => void;
}

const IngredientCard = ({ ingredient, onClick }: Props) => {
  return (
    <div className="card" onClick={onClick}>
      <img src="/ingredients.webp" alt="" />
      <div className="card-title">
        <h3>{ingredient}</h3>
      </div>
    </div>
  );
};

export default IngredientCard;
