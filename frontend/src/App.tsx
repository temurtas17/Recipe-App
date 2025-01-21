import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  addFavouriteRecipe,
  getCategories,
  getFavouriteRecipes,
  removeFavouriteRecipe,
  getRecipes,
  getAreas,
  getIngredients,
} from "./API";
import { Area, Category, Ingredient, Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import CategoryCard from "./components/CategoryCard";
import IngredientCard from "./components/IngredientCard";
import AreaCard from "./components/AreaCard";

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favouriteRecipes = await getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areas = await getAreas();
        setAreas(areas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredients = await getIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, []);

  const handleClickCategory = async (category: string) => {
    try {
      const results = await getRecipes(category, "", "");
      setRecipes(results);
      navigate("/tarifler");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickArea = async (area: string) => {
    try {
      const results = await getRecipes("", area, "");
      setRecipes(results);
      navigate("/tarifler");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickIngredient = async (ingredient: string) => {
    try {
      const results = await getRecipes("", "", ingredient);
      setRecipes(results);
      navigate("/tarifler");
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipes = async (recipe: Recipe) => {
    try {
      await addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipes = async (recipe: Recipe) => {
    try {
      await removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.idMeal !== favRecipe.idMeal
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <button className = "homepage-button" onClick={() => navigate("/")}>HomePage</button>
        <button className = "favorite-button" onClick={() => navigate("/favoriler")}>Favorites</button>
        <img src="/hero-image.jpg" alt="Hero" />
        <div className="title">Food Recipes</div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="centered-title">Categories</h1>
              <div className="category-grid">
                {categories.map((category) => {
                  return (
                    <CategoryCard
                      key={category.idCategory}
                      category={category}
                      onClick={() => handleClickCategory(category.strCategory)}
                    />
                  );
                })}
              </div>
              <h1 className="centered-title">Global Cuisine</h1>
              <div className="category-grid">
                {areas.map((area) => {
                  return (
                    <AreaCard
                      area={area.strArea}
                      onClick={() => handleClickArea(area.strArea)}
                    />
                  );
                })}
              </div>
              <h1 className="centered-title">Ingredients</h1>
              <div className="category-grid">
                {ingredients.slice(0,30).map((ingredient) => {
                  return (
                    <IngredientCard
                      key={ingredient.idIngredient}
                      ingredient={ingredient.strIngredient}
                      onClick={() => handleClickIngredient(ingredient.strIngredient)}
                    />
                  );
                })}
              </div>
            </>
          }
        />
        <Route
          path="/tarifler"
          element={
            <>
              <div className="recipe-grid">
                {recipes.map((recipe: Recipe) => {
                  const isFavourite = favouriteRecipes.some(
                    (favRecipe) => recipe.idMeal === favRecipe.idMeal
                  );

                  return (
                    <RecipeCard
                      key={recipe.idMeal}
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                      onFavouriteButtonClick={
                        isFavourite
                          ? removeFavouriteRecipes
                          : addFavouriteRecipes
                      }
                      isFavourite={isFavourite}
                    />
                  );
                })}
              </div>
            </>
          }
        />
        <Route
          path="/favoriler"
          element={
            <div className="recipe-grid">
              {favouriteRecipes
                ? favouriteRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.idMeal}
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                      onFavouriteButtonClick={removeFavouriteRecipes}
                      isFavourite={true}
                    />
                  ))
                : null}
            </div>
          }
        />
      </Routes>
      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.idMeal.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
