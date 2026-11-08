# CSE 340 Service Network — W02 Database Retrieval

This project keeps the original Express + EJS Service Network pages and adds PostgreSQL-backed organizations, service projects, and categories for W02.

## Routes

- `/` — Home
- `/organizations` — organizations retrieved from PostgreSQL
- `/projects` — projects joined to sponsoring organizations and their categories
- `/categories` — categories retrieved from PostgreSQL
- `/volunteers` — existing W01 page

## Requirements

- Node.js LTS
- PostgreSQL
- npm

## Set up locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string. Keep `.env` private and do not commit it.

3. Create or select a course database, then run `src/setup.sql` against that database. This script creates and seeds organizations, categories, projects, and the project/category junction table. It drops/recreates these four course tables, so use a fresh course database or back up existing records first.

4. Start the application:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000`, then test `/organizations`, `/projects`, and `/categories`.

## Render deployment

1. Create or use a Render PostgreSQL database.
2. In the web service's Environment settings, set `DATABASE_URL` to the database's **internal** connection URL when the service and database are in Render.
3. Set `NODE_ENV=production`.
4. Ensure the build/start command uses `npm install` and `npm start` (or Render's standard Node setup).
5. Run `src/setup.sql` against the Render database using the Render database connection details.
6. Deploy and test all three database pages. The app uses Render's `PORT` automatically.

The app uses SSL for PostgreSQL in production. If your database provider requires a different SSL configuration, adjust `src/database/pool.js` to match its documented connection requirements.

## Database design

- `organization`: organization primary key and organization details.
- `project`: project primary key, required organization foreign key, title, description, location, and date.
- `category`: category primary key, unique category name, and description.
- `project_category`: junction table with a composite primary key and foreign keys to project and category. This implements the assignment's many-to-many relationship.

The seed data includes three organizations, 15 projects (five for each organization), four categories, and category assignments for every project.

## Verify data

After running `src/setup.sql`, run these SQL checks:

```sql
SELECT * FROM organization ORDER BY organization_id;
SELECT * FROM project ORDER BY project_id;
SELECT * FROM category ORDER BY category_id;

SELECT project.title, organization.organization_name
FROM project
JOIN organization USING (organization_id)
ORDER BY project.project_date;
```

## Notes

- The course assignment specifically expects model functions in `src/models/organizations.js`, `src/models/projects.js`, and `src/models/categories.js`.
- `server.js` imports those model functions and passes the retrieved rows to EJS.
- EJS uses `<%= ... %>` for escaped output of database values.
- The SQL seed data is demonstration content; replace it only if your course team has approved or provided different records.
