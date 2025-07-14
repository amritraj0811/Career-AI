-- Create the registered_course database
CREATE DATABASE IF NOT EXISTS registered_course;
USE registered_course;

-- Table 2: course
CREATE TABLE course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  resource_id VARCHAR(100) NOT NULL,
  course_name VARCHAR(255),
  price DECIMAL(10, 2)
);

-- Table 3: enrolled_courses
CREATE TABLE enrolled_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  resource_id VARCHAR(100) NOT NULL,
  course_name VARCHAR(255),
  price DECIMAL(10, 2),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
