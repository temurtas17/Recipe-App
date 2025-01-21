export interface Category {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  ingredient: Ingredient[];
  strsource: string;
}

export interface Ingredient {
  strIngredient: string;
  strMeasure: string;
}
