// Retrieve categories and the number of projects associated with each category.
import pool from '../database/pool.js';

export async function getAllCategories() {
  const query = `
    SELECT
      category.category_id,
      category.category_name,
      category.description,
      COUNT(project_category.project_id)::INTEGER AS project_count
    FROM category
    LEFT JOIN project_category
      ON category.category_id = project_category.category_id
    GROUP BY category.category_id, category.category_name, category.description
    ORDER BY category.category_name;
  `;
  const result = await pool.query(query);
  return result.rows;
}
