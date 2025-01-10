import { pool } from "../db/index.js"; // Ensure you have your DB connection

// Fetch all recipes
export async function fetchAllRecipes() {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Fetch a recipe by its ID
export async function fetchRecipeById(id) {
  try {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

// Insert a new recipe
export async function insertRecipe(name, description, instructions, preparation_time, cooking_time, servings) {
  try {
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const result = await pool.query(
      "INSERT INTO recipes (name, description, instructions, preparation_time, cooking_time, servings, created_at, updated_at) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [name, description, instructions, preparation_time, cooking_time, servings, created_at, updated_at]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

// Modify an existing recipe by its ID
export async function modifyRecipeById(id, name, description, instructions, preparation_time, cooking_time, servings) {
  try {
    const updated_at = new Date().toISOString();

    const result = await pool.query(
      "UPDATE recipes SET name = $1, description = $2, instructions = $3, preparation_time = $4, cooking_time = $5, servings = $6, updated_at = $7 " +
      "WHERE id = $8 RETURNING *",
      [name, description, instructions, preparation_time, cooking_time, servings, updated_at, id]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

// Remove a recipe by its ID
export async function removeRecipeById(id) {
  try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
