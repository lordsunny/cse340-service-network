// Load environment variables from .env when present.
import 'dotenv/config';

// Import Express and path utilities.
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Import the required database retrieval functions.
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Use Render's port or the local development port.
const PORT = process.env.PORT || 3000;

// Resolve this file's directory for reliable static and view paths.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application.
const app = express();

// Serve CSS and images from public/.
app.use(express.static(path.join(__dirname, 'public')));

// Configure EJS templates.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Home page.
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Organizations: retrieve database records and pass them to EJS.
app.get('/organizations', async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', {
      title: 'Partner Organizations',
      organizations,
    });
  } catch (error) {
    next(error);
  }
});

// Projects: retrieve projects joined to their sponsoring organizations.
app.get('/projects', async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    // Console output helps verify retrieval during local development.
    console.log('Retrieved service projects:', projects.length);
    res.render('projects', {
      title: 'Service Projects',
      projects,
    });
  } catch (error) {
    next(error);
  }
});

// Categories: retrieve categories dynamically from PostgreSQL.
app.get('/categories', async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', {
      title: 'Service Categories',
      categories,
    });
  } catch (error) {
    next(error);
  }
});

// Volunteers page remains part of the existing W01 site.
app.get('/volunteers', (req, res) => {
  res.render('volunteers', { title: 'Volunteers' });
});

// Friendly 404 response.
app.use((req, res) => {
  res.status(404).render('home', { title: 'Page Not Found' });
});

// Central error handler for database and route errors.
app.use((error, req, res, next) => {
  console.error('Application error:', error.message);
  res.status(500).send('Something went wrong while loading this page. Please try again.');
});

// Start the web server.
app.listen(PORT, () => {
  console.log(`CSE 340 Service Network is running on port ${PORT}`);
});
