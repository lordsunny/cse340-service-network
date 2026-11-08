# W02 Database Retrieval — Line-by-Line Guide

This guide explains the W02 implementation in the project. Review the source files alongside it.

## 1. `src/setup.sql`

1. `DROP TABLE IF EXISTS project_category;` removes the relationship table first so dependent foreign keys do not block the reset.
2. The project table is dropped before category and organization tables because it references organizations.
3. `organization` defines each partner. `organization_id SERIAL PRIMARY KEY` creates a unique organization identifier.
4. `organization_name ... UNIQUE` prevents duplicate organization names.
5. `category` stores the unique category ID, name, and description.
6. `project` stores each service project and its required sponsoring `organization_id`.
7. `FOREIGN KEY (organization_id)` guarantees that every project references an organization that exists.
8. `project_category` is the junction table. Its composite primary key `(project_id, category_id)` prevents duplicate assignments.
9. The junction table's foreign keys guarantee that both the project and category exist.
10. The inserts create three organizations, four categories, and fifteen projects—five per organization.
11. The final inserts associate each project with one or more categories.
12. The commented SELECT statements are verification queries you can run after setup.

**Important:** The script intentionally resets these four course tables. Run it only against a fresh course database or after backing up records.

## 2. `src/database/pool.js`

1. `import 'dotenv/config';` loads variables from a local `.env` file when available.
2. `import pg from 'pg';` imports the PostgreSQL client library.
3. `const { Pool } = pg;` gets the connection-pool constructor.
4. `new Pool({ connectionString: process.env.DATABASE_URL, ... })` creates reusable database connections from the environment variable.
5. Production SSL is enabled for Render deployments.
6. `pool.on('error', ...)` logs unexpected idle-pool errors.
7. `export default pool;` lets model files share the same pool.

Do not put a real database password in this file or commit a real `.env`.

## 3. `src/models/organizations.js`

1. The import loads the shared pool.
2. `getAllOrganizations()` is the required model function.
3. The SQL selects the organization ID, name, description, and email.
4. `ORDER BY organization_name` makes results predictable.
5. `await pool.query(query)` waits for PostgreSQL to return the result.
6. `return result.rows` gives the route an array of organization objects.

## 4. `src/models/projects.js`

1. The model imports the shared pool.
2. `getAllProjects()` is the required project retrieval function.
3. The SELECT lists the project's ID, organization ID, title, description, location, and date.
4. `INNER JOIN organization` retrieves the sponsoring organization's name.
5. `LEFT JOIN project_category` and `LEFT JOIN category` retrieve category names without excluding a project if category assignments are missing.
6. `ARRAY_AGG` collects multiple category names into one array per project.
7. `GROUP BY` keeps one result row per project.
8. `ORDER BY project.project_date, project.title` sorts the results.
9. `return result.rows` passes the retrieved projects back to the route.

## 5. `src/models/categories.js`

1. The model imports the shared pool.
2. `getAllCategories()` selects each category and its description.
3. The LEFT JOIN keeps categories even if they have no projects.
4. `COUNT(...)` calculates how many projects are associated with each category.
5. `GROUP BY` creates one row per category.
6. `return result.rows` sends the category list to the route.

## 6. `server.js`

1. `dotenv/config` loads environment variables.
2. Express and path utilities are imported.
3. The three model functions are imported from their required files.
4. `PORT` uses Render's port or 3000 locally.
5. `__dirname` resolves project paths from the server file.
6. `express.static` serves CSS and images.
7. Express is configured to render EJS from `src/views`.
8. `/organizations` calls `getAllOrganizations()` and passes `organizations` to EJS.
9. `/projects` calls `getAllProjects()`, logs the number retrieved, and passes `projects` to EJS.
10. `/categories` calls `getAllCategories()` and passes `categories` to EJS.
11. Each database route uses `try/catch` and `next(error)` so the shared error handler can respond.
12. The 404 handler catches unmatched paths.
13. The final error middleware logs the error and returns an HTTP 500 response.
14. `app.listen` starts the server.

## 7. EJS views

### `organizations.ejs`

- The page loops through the `organizations` array supplied by the route.
- Each organization's name, description, and email are dynamic.
- `<%= ... %>` escapes output so database text is not rendered as raw HTML.
- The sample logo is selected for the three seeded organization names.

### `projects.ejs`

- The page loops through the `projects` array supplied by the route.
- Project title and description are dynamic.
- The location comes from the database.
- `toLocaleDateString` displays the date in a readable month/day/year format.
- The organization name appears in parentheses as required by the activity.
- Category names are displayed from the joined category array.

### `categories.ejs`

- The page loops through the `categories` array.
- Category name and description are dynamic.
- `project_count` shows how many projects are associated with that category.
- The page does not hardcode the category list.

## 8. Test before submitting

1. Install dependencies with `npm install`.
2. Configure `DATABASE_URL` in `.env`.
3. Run `src/setup.sql` against your selected PostgreSQL database.
4. Run `npm run dev`.
5. Test `/organizations`, `/projects`, and `/categories`.
6. Confirm the terminal reports retrieved projects and no database errors.
7. Deploy to Render, configure `DATABASE_URL`, run the SQL setup against the Render database, and test the deployed routes.

The code is prepared for database connection and deployment, but a real PostgreSQL connection and Render deployment must be tested using your own database credentials and Render account.
