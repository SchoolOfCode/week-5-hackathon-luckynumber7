import { pool } from "../db/index.js";

// Fetch all ingredients
export async function fetchAllIngredients() {
  const result = await pool.query('SELECT * FROM ingredients');
  return result.rows;
}

// Fetch ingredients by recipe ID
export async function fetchIngredientsById(recipe_id) {
  const result = await pool.query('SELECT * FROM ingredients WHERE recipe_id = $1', [recipe_id]);
  return result.rows;
}

// Insert a new ingredient into the ingredients table
export async function insertIngredients(recipe_id, ingredient_name, quantity, measurement_unit) {
  const result = await pool.query(
    'INSERT INTO ingredients (recipe_id, ingredient_name, quantity, measurement_unit) VALUES ($1, $2, $3, $4) RETURNING *',
    [recipe_id, ingredient_name, quantity, measurement_unit]
  );
  return result.rows[0]; // Return the inserted ingredient
}

// Modify an existing ingredient by its ID
export async function modifyIngredientsById(id, recipe_id, ingredient_name, quantity, measurement_unit) {
  const result = await pool.query(
    'UPDATE ingredients SET recipe_id = $1, ingredient_name = $2, quantity = $3, measurement_unit = $4 WHERE id = $5 RETURNING *',
    [recipe_id, ingredient_name, quantity, measurement_unit, id]
  );
  return result.rows[0]; // Return the updated ingredient
}

// Remove an ingredient by its ID
export async function removeIngredientsById(id) {
  const result = await pool.query('DELETE FROM ingredients WHERE id = $1 RETURNING *', [id]);
  return result.rows[0]; // Return the deleted ingredient
}
