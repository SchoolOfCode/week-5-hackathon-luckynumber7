import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
} from "../controllers/recipes.js"; // Make sure the path to the recipes controller is correct

const router = express.Router();

router.get("/", getRecipes);               // Get all recipes
router.get("/:id", getRecipeById);         // Get a recipe by ID
router.post("/", createRecipe);            // Create a new recipe
router.patch("/:id", updateRecipeById);   // Update a recipe by ID
router.delete("/:id", deleteRecipeById);  // Delete a recipe by ID

export default router;