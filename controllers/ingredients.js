import {
    fetchAllIngredients,
    fetchIngredientsById,
    insertIngredients,
    modifyIngredientsById,
    removeIngredientsById,
  } from "../models/ingredients.js";
  
  export async function getIngredients(req, res) {
    try {
      const ingredients = await fetchAllIngredients();
      res.status(200).json({ status: "success", data: ingredients });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function getIngredientsById(req, res) {
    try {
      const id = req.params.id;
      const ingredients = await fetchIngredientsById(id);
      if (!ingredients) {
        return res.status(404).json({ status: "fail", message: "Ingredients not found" });
      }
      res.status(200).json({ status: "success", data: ingredients });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function createIngredients(req, res) {
    try {
      const { ingredient_name, quantity, measurement_unit } = req.body;
      if (!ingredient_name || !quantity || !measurement_unit) {
        return res.status(400).json({ status: "fail", message: "Missing required fields" });
      }
      const newIngredient = await insertIngredients(ingredient_name, quantity, measurement_unit);
      res.status(201).json({ status: "success", data: newIngredient });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function updateIngredientsById(req, res) {
    try {
      const id = req.params.id;
      const { ingredient_name, quantity, measurement_unit } = req.body;
      if (!ingredient_name || !quantity || !measurement_unit) {
        return res.status(400).json({ status: "fail", message: "Missing required fields" });
      }
      const updatedIngredient = await modifyIngredientsById(id, ingredient_name, quantity, measurement_unit);
      if (!updatedIngredient) {
        return res.status(404).json({ status: "fail", message: "Ingredients not found" });
      }
      res.status(200).json({ status: "success", data: updatedIngredient });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  
  export async function deleteIngredientsById(req, res) {
    try {
      const id = req.params.id;
      const ingredient = await removeIngredientsById(id);
      if (!ingredient) {
        return res.status(404).json({ status: "fail", message: "Ingredients not found" });
      }
      res.status(204).send(); // 204 No Content
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  