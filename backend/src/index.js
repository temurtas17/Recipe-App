"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const recipeAPI = __importStar(require("./recipe-api"));
const client_1 = require("@prisma/client");
const recipe_api_1 = require("./recipe-api");
const app = (0, express_1.default)();
const prismaClient = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/recipe/category", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipeAPI.getCategories();
    res.json(result);
}));
app.get("/api/recipe/area", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipeAPI.getAreas();
    res.json(result);
}));
app.get("/api/recipe/ingredient", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipeAPI.getIngredients();
    res.json(result);
}));
app.get("/api/recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.query.categoryName;
    const areaName = req.query.areaName;
    const ingredientName = req.query.ingredientName;
    const result = yield recipeAPI.getRecipes(categoryName, areaName, ingredientName);
    res.json(result);
}));
app.get("/api/recipe/:recipeId/details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = req.params.recipeId;
    const result = yield recipeAPI.getRecipeDetails(recipeId);
    res.json(result);
}));
app.post("/api/recipe/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    try {
        const favoriteRecipe = yield prismaClient.favoriteRecipe.create({
            data: { recipeId },
        });
        res.status(201).json(favoriteRecipe);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Oops, something went wrong." });
    }
}));
app.get("/api/recipe/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteRecipes = yield prismaClient.favoriteRecipe.findMany();
        const recipeIds = favoriteRecipes.map((recipe) => recipe.recipeId.toString());
        const favorites = yield (0, recipe_api_1.getFavoriteRecipesByIds)(recipeIds);
        res.json(favorites);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Oops, something went wrong." });
    }
}));
app.delete("/api/recipe/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    try {
        yield prismaClient.favoriteRecipe.delete({
            where: { recipeId },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Oops, something went wrong." });
    }
}));
app.listen(5000, () => {
    console.log("Server running on localhost:5000");
});
