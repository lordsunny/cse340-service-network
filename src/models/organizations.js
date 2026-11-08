// Retrieve partner organizations from PostgreSQL.
import pool from '../database/pool.js';

export async function getAllOrganizations() {
  const query = `
    SELECT organization_id, organization_name, description, email
    FROM organization
    ORDER BY organization_name;
  `;
  const result = await pool.query(query);
  return result.rows;
}
