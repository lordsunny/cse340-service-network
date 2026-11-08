# W02 Submission Checklist

- [ ] Install dependencies (`npm install`; this project now includes `pg`).
- [ ] Create a PostgreSQL database and set `DATABASE_URL` in a private `.env`.
- [ ] Execute `src/setup.sql` against that database (it resets the four course tables).
- [ ] Run `npm run dev`.
- [ ] Verify `/organizations`, `/projects`, and `/categories`.
- [ ] Confirm projects show `Date: Project Title (Organization Name)`.
- [ ] Configure Render `DATABASE_URL` and `NODE_ENV=production`.
- [ ] Run `src/setup.sql` against the Render database.
- [ ] Deploy and test the live routes.
- [ ] Submit GitHub repository URL and Render URL in Canvas.
