import {
    fetchAllRecipes,
    fetchRecipeById,
    insertRecipe,
    modifyRecipeById,
    removeRecipeById,
  } from "../models/recipes.js";
  
  export async function getRecipes(req, res) {
    try {
      const recipes = await fetchAllRecipes();
      res.status(200).json({ status: "success", data: recipes });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function getRecipeById(req, res) {
    try {
      const id = req.params.id;
      const recipe = await fetchRecipeById(id);
      if (!recipe) {
        return res
          .status(404)
          .json({ status: "fail", message: "Recipe not found" });
      }
      res.status(200).json({ status: "success", data: recipe });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function createRecipe(req, res) {
    try {
      const { name, description, instructions, preparation_time, cooking_time, servings } = req.body;
      if (!name || !description || !instructions || !preparation_time || !cooking_time || !servings) {
        return res
          .status(400)
          .json({ status: "fail", message: "Missing required fields" });
      }
      const newRecipe = await insertRecipe(name, description, instructions, preparation_time, cooking_time, servings);
      res.status(201).json({ status: "success", data: newRecipe });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function updateRecipeById(req, res) {
    try {
      const id = req.params.id;
      const { name, description, instructions, preparation_time, cooking_time, servings } = req.body;
      if (!name || !description || !instructions || !preparation_time || !cooking_time || !servings) {
        return res
          .status(400)
          .json({ status: "fail", message: "Missing required fields" });
      }
      const updatedRecipe = await modifyRecipeById(id, name, description, instructions, preparation_time, cooking_time, servings);
      if (!updatedRecipe) {
        return res
          .status(404)
          .json({ status: "fail", message: "Recipe not found" });
      }
      res.status(200).json({ status: "success", data: updatedRecipe });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function deleteRecipeById(req, res) {
    try {
      const id = req.params.id;
      const recipe = await removeRecipeById(id);
      if (!recipe) {
        return res
          .status(404)
          .json({ status: "fail", message: "Recipe not found" });
      }
      res.status(204).send(); // 204 No Content
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  