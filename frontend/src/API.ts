import { Recipe } from "./types";

export const getCategories = async () => {
  const url = new URL("http://localhost:5000/api/recipe/category");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const result = await response.json();
  
  return result;
};

export const getAreas = async () => {
  const url = new URL("http://localhost:5000/api/recipe/area");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  
  return result;
};

export const getIngredients = async () => {
  const url = new URL("http://localhost:5000/api/recipe/ingredient");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  
  return result;
};

export const getRecipes = async (categoryName: string, areaName: string, ingredientName: string) => {
  const baseURL = new URL("http://localhost:5000/api/recipe");
  baseURL.searchParams.append("categoryName", categoryName);
  baseURL.searchParams.append("areaName", areaName);
  baseURL.searchParams.append("ingredientName", ingredientName);

  const response = await fetch(baseURL.toString());

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();
  
  return result;
};

export const getRecipeDetails = async (recipeId: string) => {
  const url = new URL(`http://localhost:5000/api/recipe/${recipeId}/details`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipe/favorite");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const addFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipe/favorite");
  const body = {
    recipeId: Number(recipe.idMeal),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipe/favorite");
  const body = {
    recipeId: Number(recipe.idMeal),
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
