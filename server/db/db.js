// db/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Subscribed Users DB
const subscribedDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.SUBSCRIBED_DB_NAME,
});

// Registered Course DB
const registeredDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.REGISTERED_DB_NAME,
});

// Connect to subscribed_users DB
subscribedDB.connect((err) => {
  if (err) {
    console.error('❌ subscribed_users DB connection error:', err);
  } else {
    console.log('✅ Connected to subscribed_users DB.');
  }
});

// Connect to registered_course DB
registeredDB.connect((err) => {
  if (err) {
    console.error('❌ registered_course DB connection error:', err);
  } else {
    console.log('✅ Connected to registered_course DB.');
  }
});

module.exports = {
  subscribedDB,
  registeredDB,
};
