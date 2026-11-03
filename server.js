// Load environment variables from .env when the file exists.
import 'dotenv/config';


// Import Express and Node.js path utilities.
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';


// Use the hosting platform's port, or port 3000 locally.
const PORT = process.env.PORT || 3000;


// Convert this module's URL into normal file-system paths.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Create the Express application.
const app = express();


// Serve static files such as CSS and images from the public folder.
app.use(express.static(path.join(__dirname, 'public')));


// Configure EJS and tell Express where the templates are stored.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


// Render the home page.
app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});


// Render the partner organizations page.
app.get('/organizations', async (req, res) => {
  const title = 'Partner Organizations';
  res.render('organizations', { title });
});


// Render the service projects page.
app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  res.render('projects', { title });
});


// Render the service categories page.
app.get('/categories', async (req, res) => {
  const title = 'Service Categories';
  res.render('categories', { title });
});


// Render the volunteers page.
app.get('/volunteers', async (req, res) => {
  const title = 'Volunteers';
  res.render('volunteers', { title });
});


// Start the server.
app.listen(PORT, () => {
  console.log(`CSE 340 Service Network is running on port ${PORT}`);
});
