-- Create the registered_course database
CREATE DATABASE IF NOT EXISTS registered_course;
USE registered_course;

-- Table 2: course
CREATE TABLE course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  resource_id VARCHAR(100) NOT NULL,
);

-- Step 3: Create the enrolled_courses table (no ID, no timestamps)
CREATE TABLE enrolled_courses (
  user_email VARCHAR(255) COLLATE utf8mb4_general_ci,
  resource_id VARCHAR(255) COLLATE utf8mb4_general_ci
);
