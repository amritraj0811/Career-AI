-- Create the subscribed_users database
CREATE DATABASE IF NOT EXISTS subscribed_users;
USE subscribed_users;

-- Table 1: subscriptions
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  pathway_id VARCHAR(100) NOT NULL
);
