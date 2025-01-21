import { useState, useEffect } from "react";
import { RecipeDetails } from "../types";
import * as RecipeAPI from "../API";

interface Props {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const details = await RecipeAPI.getRecipeDetails(recipeId);
        setRecipeDetails(details);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipeDetails) {
    return <></>;
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeDetails.strMeal}</h2>
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
          </div>
          <p>{recipeDetails?.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
