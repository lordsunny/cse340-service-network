// Retrieve service projects and the organization that sponsors each project.
import pool from '../database/pool.js';

export async function getAllProjects() {
  const query = `
    SELECT
      project.project_id,
      project.organization_id,
      project.title,
      project.description,
      project.location,
      project.project_date,
      organization.organization_name,
      COALESCE(
        ARRAY_AGG(category.category_name ORDER BY category.category_name)
          FILTER (WHERE category.category_name IS NOT NULL),
        ARRAY[]::VARCHAR[]
      ) AS categories
    FROM project
    INNER JOIN organization
      ON project.organization_id = organization.organization_id
    LEFT JOIN project_category
      ON project.project_id = project_category.project_id
    LEFT JOIN category
      ON project_category.category_id = category.category_id
    GROUP BY
      project.project_id,
      project.organization_id,
      project.title,
      project.description,
      project.location,
      project.project_date,
      organization.organization_name
    ORDER BY project.project_date, project.title;
  `;
  const result = await pool.query(query);
  return result.rows;
}
