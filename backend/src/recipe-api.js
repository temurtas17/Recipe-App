"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteRecipesByIds = exports.getRecipeDetails = exports.getRecipes = exports.getIngredients = exports.getAreas = exports.getCategories = void 0;
const API_KEY = process.env.API_KEY;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const url = new URL(baseURL);
    try {
        const searchResponse = yield fetch(url.toString());
        const resultsJson = yield searchResponse.json();
        return resultsJson.categories;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getCategories = getCategories;
const getAreas = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/list.php";
    const url = new URL(baseURL);
    const queryParams = { a: "list" };
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = yield fetch(url.toString());
        const resultsJson = yield searchResponse.json();
        return resultsJson.meals;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAreas = getAreas;
const getIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/list.php";
    const url = new URL(baseURL);
    const queryParams = { i: "list" };
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = yield fetch(url.toString());
        const resultsJson = yield searchResponse.json();
        return resultsJson.meals;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getIngredients = getIngredients;
const getRecipes = (categoryName, areaName, ingredientName) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php";
    const url = new URL(baseURL);
    let queryParams;
    if (categoryName !== "") {
        queryParams = { c: categoryName };
    }
    else if (areaName !== "") {
        queryParams = { a: areaName };
    }
    else if (ingredientName !== "") {
        queryParams = { i: ingredientName };
    }
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = yield fetch(url.toString());
        const resultsJson = yield searchResponse.json();
        return resultsJson.meals;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getRecipes = getRecipes;
const getRecipeDetails = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://www.themealdb.com/api/json/v1/1/lookup.php";
    const url = new URL(baseURL);
    const queryParams = { i: recipeId };
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = yield fetch(url.toString());
        const responseJson = yield searchResponse.json();
        const result = responseJson.meals[0];
        const recipeDetails = extractRecipeDetails(result);
        return recipeDetails;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getRecipeDetails = getRecipeDetails;
const getFavoriteRecipesByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = [];
    for (const id of ids) {
        const response = yield (0, exports.getRecipeDetails)(id);
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
});
exports.getFavoriteRecipesByIds = getFavoriteRecipesByIds;
function extractRecipeDetails(response) {
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
function extractIngredients(response) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = response[`strIngredient${i}`];
        const measure = response[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push({ strIngredient: ingredient, strMeasure: measure });
        }
    }
    return ingredients;
}
