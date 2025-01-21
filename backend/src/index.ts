import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import * as recipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";
import { getFavoriteRecipesByIds } from "./recipe-api";

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/category", async (_req, res) => {
    const result = await recipeAPI.getCategories();
    res.json(result);
});

app.get("/api/recipe/area", async (_req, res) => {
    const result = await recipeAPI.getAreas();
    res.json(result);
});

app.get("/api/recipe/ingredient", async (_req, res) => {
    const result = await recipeAPI.getIngredients();
    res.json(result);
});

app.get("/api/recipe", async (req, res) => {
  const categoryName = req.query.categoryName as string;
  const areaName = req.query.areaName as string;
  const ingredientName = req.query.ingredientName as string;
  
  const result = await recipeAPI.getRecipes(categoryName, areaName, ingredientName);
  res.json(result);
});

app.get("/api/recipe/:recipeId/details", async (req, res) => {
  const recipeId = req.params.recipeId;
  const result = await recipeAPI.getRecipeDetails(recipeId);
  res.json(result);
});

app.post("/api/recipe/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
      data: { recipeId },
    });
    res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.get("/api/recipe/favorite", async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favoriteRecipe.findMany();
    const recipeIds = favoriteRecipes.map((recipe: any) =>
      recipe.recipeId.toString()
    );
    const favorites = await getFavoriteRecipesByIds(recipeIds);
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.delete("/api/recipe/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    await prismaClient.favoriteRecipe.delete({
      where: { recipeId },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
