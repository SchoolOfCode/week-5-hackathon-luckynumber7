import express from "express";
import {
  getIngredients,
  getIngredientsById,
  createIngredients,
  updateIngredientsById,
  deleteIngredientsById,
} from "../controllers/ingredients.js"; // Make sure the path to the ingredients controller is correct

const router = express.Router();

router.get("/", getIngredients);               // Get all ingredients
router.get("/:id", getIngredientsById);        // Get an ingredient by ID
router.post("/", createIngredients);           // Create a new ingredient
router.patch("/:id", updateIngredientsById);  // Update an ingredient by ID
router.delete("/:id", deleteIngredientsById); // Delete an ingredient by ID

export default router;
