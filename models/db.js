const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",          // Database host
  user: process.env.DB_USER || "root",              // Database username
  password: process.env.DB_PASSWORD || "Kavi2005@",  // Database password
  database: process.env.DB_NAME || "employee_management", // Database name
  port: process.env.DB_PORT || 3306                 // Default MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database successfully!");
});

module.exports = db;
