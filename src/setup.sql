-- CSE 340 W02 Database Retrieval
-- Re-runnable setup for a fresh course database.
-- WARNING: DROP statements remove existing rows in these course tables.

DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(80) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(180) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Many-to-many relationship: projects can have multiple categories,
-- and each category can be used by multiple projects.
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO organization (organization_name, description, email) VALUES
('BrightFuture Builders', 'Supports educational growth and learning opportunities for people in the community.', 'info@brightfuture.org'),
('GreenHarvest Growers', 'Encourages environmental care, community gardens, and sustainable local projects.', 'contact@greenharvest.org'),
('UnityServe Volunteers', 'Connects volunteers with practical opportunities to help neighbors and local groups.', 'hello@unityserve.org');

INSERT INTO category (category_name, description) VALUES
('Environmental', 'Care for nature through clean-ups, gardening, conservation, and sustainability.'),
('Educational', 'Support learning through tutoring, reading, mentoring, and educational resources.'),
('Community Service', 'Strengthen neighborhoods through local support and improvement projects.'),
('Health and Wellness', 'Assist community well-being events and approved health education activities.');

INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(2, 'Community Garden Day', 'Prepare garden beds, plant seedlings, and care for a shared green space.', 'Community Garden', '2026-12-05'),
(1, 'Reading Support', 'Read with young learners and support basic literacy practice.', 'Learning Center', '2026-12-06'),
(3, 'Neighborhood Clean-up', 'Collect litter and improve a shared public area with volunteers.', 'Central Neighborhood', '2026-12-07'),
(3, 'Wellness Check-in', 'Welcome visitors and share approved community wellness resources.', 'Community Hall', '2026-12-08'),
(2, 'Tree Planting', 'Plant native trees and learn how to care for young trees.', 'Riverside Park', '2026-12-09'),
(1, 'Homework Club', 'Help students organize assignments and practice learning skills.', 'BrightFuture Center', '2026-12-10'),
(3, 'Food Pantry Support', 'Sort donations and prepare food packages for local families.', 'UnityServe Pantry', '2026-12-11'),
(2, 'Park Restoration', 'Remove invasive plants and restore a neighborhood park area.', 'Oakview Park', '2026-12-12'),
(1, 'Digital Skills Workshop', 'Assist learners with basic computer and internet skills.', 'Learning Center', '2026-12-13'),
(3, 'Senior Community Visit', 'Spend time with older community members and help with approved activities.', 'Senior Center', '2026-12-14'),
(2, 'Recycling Awareness', 'Help residents learn recycling practices and sort recyclable materials.', 'Town Resource Hub', '2026-12-15'),
(1, 'Book Collection', 'Collect and organize gently used books for community readers.', 'BrightFuture Center', '2026-12-16'),
(3, 'Community Supplies Drive', 'Organize donated school and household supplies for distribution.', 'UnityServe Hall', '2026-12-17'),
(2, 'Garden Harvest', 'Harvest seasonal produce and prepare it for community distribution.', 'Community Garden', '2026-12-18'),
(1, 'Youth Mentoring Day', 'Encourage youth through goal setting, mentoring, and group activities.', 'BrightFuture Center', '2026-12-19');

-- Each project receives at least one category; some receive multiple.
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), (1, 3),
(2, 2), (2, 3),
(3, 1), (3, 3),
(4, 3), (4, 4),
(5, 1), (5, 3),
(6, 2),
(7, 3), (7, 4),
(8, 1), (8, 3),
(9, 2),
(10, 3), (10, 4),
(11, 1), (11, 3),
(12, 2), (12, 3),
(13, 3),
(14, 1), (14, 3),
(15, 2), (15, 3);

-- Verification queries:
-- SELECT * FROM organization ORDER BY organization_id;
-- SELECT * FROM project ORDER BY project_id;
-- SELECT * FROM category ORDER BY category_id;
-- SELECT project.title, organization.organization_name
-- FROM project JOIN organization USING (organization_id);
