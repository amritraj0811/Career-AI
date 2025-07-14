-- Create the career_ai database
CREATE DATABASE IF NOT EXISTS career_ai;
USE career_ai;

-- Table 4: roadmaps
CREATE TABLE roadmaps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) DEFAULT NULL,
  prompt TEXT,
  roadmap TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
