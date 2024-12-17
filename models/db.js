const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kavi2005@",
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application if the database connection fails
  }
  console.log("Connected to MySQL Database!");
});

module.exports = db;