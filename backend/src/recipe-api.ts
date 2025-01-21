import { Category, Ingredient, Recipe, RecipeDetails } from "./types";

const API_KEY = process.env.API_KEY;

export const getCategories = async () => {
  const baseURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const url = new URL(baseURL);

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson.categories as Category[];
  } catch (error) {
    console.error(error);
  }
};

export const getAreas = async () => {
  const baseURL = "https://www.themealdb.com/api/json/v1/1/list.php";
  const url = new URL(baseURL);

  const queryParams = { a: "list" };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson.meals;
  } catch (error) {
    console.error(error);
  }
};

export const getIngredients = async () => {
  const baseURL = "https://www.themealdb.com/api/json/v1/1/list.php";
  const url = new URL(baseURL);

  const queryParams = { i: "list" };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson.meals;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipes = async (categoryName: string, areaName: string, ingredientName: string) => {
  const baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php";
  const url = new URL(baseURL);

  let queryParams;

  if (categoryName !== "") {
    queryParams = { c: categoryName };
  } else if (areaName !== "") {
    queryParams = { a: areaName };
  } else if (ingredientName !== "") {
    queryParams = { i: ingredientName };
  }

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson.meals as Recipe[];
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeDetails = async (recipeId: string) => {
  const baseURL = "https://www.themealdb.com/api/json/v1/1/lookup.php";
  const url = new URL(baseURL);

  const queryParams = { i: recipeId };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const responseJson = await searchResponse.json();
    const result = responseJson.meals[0];

    const recipeDetails = extractRecipeDetails(result);
    
    return recipeDetails;
  } catch (error) {
    console.error(error);
  }
};

export const getFavoriteRecipesByIds = async (ids: string[]) => {
  const recipes: Recipe[] = [];
  for (const id of ids) {
    const response = await getRecipeDetails(id);
    if (response) {
      const recipe = {
        strMeal: response.strMeal,
        strMealThumb: response.strMealThumb,
        idMeal: response.idMeal,
      };

      recipes.push(recipe);
    }
  }
  return recipes;
};

function extractRecipeDetails(response: any): RecipeDetails {
  return {
    idMeal: response.idMeal,
    strMeal: response.strMeal,
    strCategory: response.strCategory,
    strArea: response.strArea,
    strInstructions: response.strInstructions,
    strMealThumb: response.strMealThumb,
    strYoutube: response.strYoutube,
    ingredient: extractIngredients(response),
    strsource: response.strsource,
  };
}

function extractIngredients(response: any): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = response[`strIngredient${i}`];
    const measure = response[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ strIngredient: ingredient, strMeasure: measure });
    }
  }
  return ingredients;
}
