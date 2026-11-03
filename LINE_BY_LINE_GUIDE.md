# CSE 340 Service Network — Line-by-Line Learning Guide

## Read this first: what “line by line” means

The source files in this project contain the complete code so the site can be assembled. Learning line by line means you study and understand each statement in sequence, rather than pasting a whole file and claiming you wrote it line by line.

Use this guide with the source files. Work on one file at a time. Read one numbered explanation, find that statement in the source file, type or retype it yourself, save, and test when the section is complete. Do not move to the next file until you can explain the current one.

This is an **initial Express/EJS site**. It does not yet implement a database or persistent records. The course description says the system will eventually include database entries for organizations, service projects, categories, and volunteers. Add database models, database connections, CRUD operations, and volunteer registration when the specific course assignment teaches/requires them. Do not describe this starter as the completed term project.

---

# 1. `server.js` — Express server, middleware, and routes

Open `server.js`. Read it from top to bottom.

1. `import 'dotenv/config';` loads variables from a local `.env` file when present. It does not require you to put secrets in source code.
2. `import express from 'express';` imports the Express framework used to create the web server.
3. `import { fileURLToPath } from 'url';` imports Node's helper for converting a module URL to a file-system path.
4. `import path from 'path';` imports Node's path utilities for building paths that work across operating systems.
5. `const PORT = process.env.PORT || 3000;` uses the hosting platform's port when it supplies one; otherwise it uses port 3000 for local development.
6. `const __filename = fileURLToPath(import.meta.url);` converts the current ES module's URL into the full file path.
7. `const __dirname = path.dirname(__filename);` obtains the directory containing `server.js`.
8. `const app = express();` creates the Express application object. We use `app` to configure middleware and routes.
9. `app.use(express.static(path.join(__dirname, 'public')));` makes files in `public` available to browsers. For example, `public/css/main.css` is requested using `/css/main.css`.
10. `app.set('view engine', 'ejs');` tells Express to render `.ejs` templates using EJS.
11. `app.set('views', path.join(__dirname, 'src/views'));` tells Express where the EJS templates are stored.
12. `app.get('/', async (req, res) => { ... });` registers the Home route. `req` represents the incoming request and `res` is used to send a response.
13. `const title = 'Home';` creates the title value for the Home template.
14. `res.render('home', { title });` renders `home.ejs` and passes the title into the template.
15. The `/organizations` route follows the same pattern but renders `organizations.ejs`.
16. The `/projects` route renders `projects.ejs`.
17. The `/categories` route renders `categories.ejs`.
18. The `/volunteers` route renders `volunteers.ejs`.
19. `app.use((req, res) => { ... });` is the fallback middleware. Since it appears after the page routes, it handles requests that did not match those routes.
20. `res.status(404).render('not-found', { title: 'Page Not Found' });` sends HTTP status 404 and renders the not-found template.
21. `app.listen(PORT, () => { ... });` starts the server listening on the selected port.
22. `console.log(...)` prints a useful local/server startup message.

### Test after this file

In the project terminal, run `npm install`, then `npm run dev`. Open `http://localhost:3000`. If the browser reports a template error, check that the view filename matches the string passed to `res.render`.

---

# 2. `src/views/partials/header.ejs` — shared page opening and navigation

Study the header in this order:

1. `<!DOCTYPE html>` tells the browser to use modern HTML.
2. `<html lang="en">` starts the document and identifies its language as English.
3. `<head>` begins document metadata, which is not the visible page content.
4. `<meta charset="UTF-8">` sets the character encoding.
5. The viewport meta tag makes the layout use the device width on mobile screens.
6. The description meta tag provides a short description of the site.
7. `<title><%= title %> | CSE 340 Service Network</title>` sets the browser-tab title. `<%= title %>` safely outputs the value supplied by the Express route.
8. `<link rel="stylesheet" href="/css/main.css">` loads the stylesheet served from the `public` folder.
9. `</head>` closes the metadata section.
10. `<body>` begins visible page content.
11. `<header class="site-header">` marks the shared site header.
12. `<div class="container header-inner">` provides a centered width and layout wrapper.
13. The brand `<a href="/">` makes the brand link return to the Home route.
14. `<span class="brand-mark">SN</span>` displays the small text brand mark.
15. `<nav aria-label="Main navigation">` identifies the main navigation for assistive technology.
16. Each `<a>` is a link to one Express route: `/`, `/organizations`, `/projects`, `/categories`, and `/volunteers`.
17. Closing tags finish the navigation, wrapper, header, and leave the body open for the page-specific template.

The header is a partial because every page can reuse it instead of repeating the document opening and navigation.

---

# 3. `src/views/partials/footer.ejs` — shared footer

1. `<footer class="site-footer">` marks the footer section.
2. `<div class="container footer-inner">` applies the shared centered layout.
3. `&copy;` displays the copyright symbol.
4. `<%= new Date().getFullYear() %>` calculates the current year when the page is rendered.
5. The footer text identifies this as the CSE 340 Service Network project.
6. The final link returns the visitor to `/`.
7. `</footer>` closes the footer.
8. `</body>` closes the visible document.
9. `</html>` closes the HTML document.

The footer partial closes the document that the header partial opened.

---

# 4. How every EJS page is assembled

Each page follows this pattern:

1. `<%- include('partials/header') %>` inserts the shared header. The unescaped EJS include syntax is used because the result is trusted template markup.
2. `<main>` starts the primary content of the page.
3. The page's `<section>` groups related content.
4. `<h1><%= title %></h1>` outputs the title passed by the route. Use `<%= %>` for normal text values so EJS escapes HTML-sensitive characters.
5. The page-specific headings, paragraphs, cards, images, or links appear inside the main content.
6. `</main>` closes the primary content.
7. `<%- include('partials/footer') %>` inserts the footer and closes the document.

## 4A. `home.ejs`

Read the file top to bottom:

1. The first include inserts the shared header.
2. `<main>` marks the main Home page content.
3. The hero `<section>` groups the introductory message and main call-to-action links.
4. The `.container` class keeps the hero content aligned with the rest of the site.
5. `.hero-grid` creates the two-column hero layout in CSS.
6. `.hero-copy` groups the text portion of the hero.
7. The eyebrow paragraph is a short introductory label.
8. `<h1>` communicates the main purpose of the website. A page should have a clear primary heading.
9. The next paragraph explains what visitors can do on the site.
10. `.hero-actions` groups the two navigation calls to action.
11. The first anchor links to `/projects`; the second links to `/organizations`.
12. `.hero-art` groups the illustrative image.
13. The `<img>` uses `/images/cse340-service-network.png`. Its `alt` text describes the image for visitors who cannot see it.
14. The next section introduces three ways to participate.
15. Each `<article>` is a self-contained information card.
16. Each card has a heading, explanatory paragraph, and a link to the relevant page.
17. The callout section repeats a clear invitation and links to the projects page.
18. The footer include inserts the shared footer.

## 4B. `organizations.ejs`

1. Include the shared header.
2. Start `<main>` and the centered page container.
3. The page-intro section introduces partner organizations.
4. `<h1><%= title %></h1>` displays the title passed by the `/organizations` route.
5. `.organization-list` groups the organization cards.
6. Each `.organization-card` is an article describing one sample organization.
7. The `<img>` displays that organization's logo. Its `alt` attribute names the logo.
8. The `<h2>` gives the organization name.
9. The paragraph describes its sample service focus.
10. The `mailto:` anchor creates an email link. These addresses are demonstration placeholders, not verified contacts.
11. The notice explains that the organization profiles are sample content.
12. Include the shared footer.

## 4C. `projects.ejs`

1. Include the header and open the main page container.
2. The page-intro section introduces service projects.
3. `.card-grid.project-grid` groups the project cards and applies a two-column layout on wider screens.
4. Each project is an `<article>` because it is an independent item.
5. The `.tag` span identifies the sample category.
6. The `<h2>` gives the project name.
7. The paragraph explains the sample activity.
8. `.project-meta` identifies a suggested activity, not a confirmed opening.
9. Four cards demonstrate Environmental, Educational, Community Service, and Health and Wellness examples.
10. The notice clarifies that these are not verified volunteer openings.
11. Include the footer.

## 4D. `categories.ejs`

1. Include the shared header and open the main content.
2. The page-intro section explains the purpose of categories.
3. `<h1><%= title %></h1>` displays the route-provided page title.
4. `.card-grid` groups the category cards.
5. Each category is represented by an `<article>`.
6. `.category-symbol` displays a decorative symbol. `aria-hidden="true"` means assistive technology can ignore the decorative symbol.
7. The `<h2>` names the category.
8. The paragraph explains the type of service that belongs in the category.
9. The four required categories are Environmental, Educational, Community Service, and Health and Wellness.
10. Include the footer.

## 4E. `volunteers.ejs`

1. Include the shared header and open the main content.
2. The page introduction explains the role of volunteers.
3. The first card introduces volunteer opportunities.
4. The second card explains that a later database stage can store volunteer profiles.
5. The third card directs visitors to the projects page.
6. The notice states that this is a static initial page and does not yet register volunteers or save profiles.
7. Include the footer.

## 4F. `not-found.ejs`

1. Include the shared header.
2. Open the main content.
3. Display the 404 label and the title supplied by the Express fallback route.
4. Explain that the requested page could not be found.
5. Link the visitor back to `/`.
6. Include the shared footer.

---

# 5. `public/css/main.css` — styling, section by section

CSS is read as selector/declaration rules. For each rule, the selector identifies which HTML elements receive the styles, and each declaration is a `property: value;` pair.

1. `:root` defines reusable CSS custom properties (design tokens), such as the navy, blue, text, background, border, radius, and shadow values.
2. `* { box-sizing: border-box; }` makes element width calculations include padding and borders.
3. `html` enables smooth scrolling. A reduced-motion override later disables this for visitors who prefer less motion.
4. `body` removes the default margin and sets the page background, text color, font, and line spacing.
5. `img` prevents images from overflowing their containers.
6. `a` sets the default link color.
7. `:focus-visible` gives keyboard users a visible focus outline.
8. `.container` sets a maximum content width and centers it.
9. `.site-header` styles the shared header background and divider.
10. `.header-inner`, `.brand`, `.main-nav`, and `.footer-inner` use flexbox for alignment.
11. `.header-inner` distributes the brand and navigation across the header.
12. `.brand` styles the home link and its small mark.
13. `.brand-mark` creates the colored square containing “SN”.
14. `.main-nav` allows navigation links to wrap when space is limited.
15. `.main-nav a` styles each navigation link; its hover rule changes the background.
16. `.hero` creates the pale background behind the Home introduction.
17. `.hero-grid` uses CSS Grid for the text and image columns.
18. `.hero h1` uses `clamp()` so the heading scales between a minimum and maximum size.
19. `.hero-text` limits the paragraph width and applies muted text color.
20. `.hero-art` centers the image.
21. `.button` defines shared button-like anchor styles.
22. `.button-primary`, `.button-secondary`, and `.button-light` define the different button appearances.
23. `.section` adds spacing around the Home page content section.
24. `.section-heading` and `.page-intro` limit the width of introductory text.
25. `.card-grid` creates a three-column grid on wide screens.
26. `.info-card` defines the white card background, border, rounded corners, padding, and shadow.
27. `.card-icon` and `.category-symbol` style decorative markers.
28. `.page-content` adds spacing and minimum height to internal pages.
29. `.organization-list` stacks organization cards.
30. `.organization-card` aligns each logo with its description.
31. `.organization-card img` gives each logo a fixed display area and uses `object-fit: contain`.
32. `.project-grid` changes the project listing to two columns.
33. `.tag` styles category labels.
34. `.notice` styles explanatory notes.
35. `.callout` styles the dark invitation band on the Home page.
36. `.site-footer` styles the footer background and text.
37. `@media (max-width: 800px)` changes the header and hero layout and reduces the card grid to two columns on narrower screens.
38. `@media (max-width: 560px)` changes the card grids to one column, stacks organization cards, and stacks footer/callout content.
39. `@media (prefers-reduced-motion: reduce)` disables smooth scrolling and nearly all transitions for visitors who request reduced motion.

When learning CSS, take one selector block at a time. Change one declaration, save, refresh the browser, and observe what changed.

---

# 6. `package.json`

1. `name` is the package/project identifier.
2. `version` records the starter project's version.
3. `description` briefly describes the project.
4. `"type": "module"` enables ES module `import` syntax in `server.js`.
5. `main` identifies the main server file.
6. `scripts.dev` starts Node's watch mode for local development.
7. `scripts.start` starts the server normally, which is suitable for a production start command.
8. `dependencies` lists Express, EJS, and dotenv. `npm install` installs them and creates/updates `package-lock.json`.

---

# 7. `.gitignore` and environment variables

1. `node_modules/` prevents installed packages from being committed to Git.
2. `.env` prevents local environment values and secrets from being committed.
3. `.env.*` ignores other environment-specific files.
4. `!.env.example` makes the safe example file an exception so it can be committed.
5. `.DS_Store` and npm debug logs are local/system files that do not belong in the repository.
6. `.env.example` documents the optional `PORT` variable without containing a secret.

Never overwrite an existing `.env` file when working on the project. Keep it local and private.

---

# 8. Requirement checklist for the initial site

- [x] Express server
- [x] Static middleware for `public`
- [x] EJS view engine
- [x] EJS views folder configuration
- [x] Home route and page
- [x] Partner organizations route and page
- [x] Service projects route and page
- [x] Categories route and page
- [x] Volunteers route and introductory page
- [x] Shared header and footer partials
- [x] Navigation links to all five main sections
- [x] Responsive stylesheet
- [x] Image files with the required filenames
- [x] `.gitignore` excludes `.env`
- [ ] Install dependencies and run locally on your computer
- [ ] Replace sample placeholder images with official course-provided assets, if supplied
- [ ] Verify the content against the exact current assignment rubric
- [ ] Push to the student's GitHub repository
- [ ] Deploy to Render and test the deployed site

## Database scope

The overall course project description mentions database entries for partner organizations, service projects, categories, and volunteers. This initial-site package does not include a database connection or database records. Those features must be implemented according to the later database assignment instructions. This distinction is intentional so the initial site does not pretend to satisfy future work that has not yet been specified here.
