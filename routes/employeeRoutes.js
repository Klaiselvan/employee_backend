const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Add Employee Route
router.post("/add", (req, res) => {
  const {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    department,
    date_of_joining,
    role,
  } = req.body;

  if (
    !employee_id ||
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !department ||
    !date_of_joining ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email or phone number already exists
  const checkQuery = `
    SELECT * FROM employees WHERE email = ? OR phone_number = ?
  `;
  db.query(checkQuery, [email, phone_number], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking email and phone number:", checkErr);
      return res.status(500).json({ error: "Database query error" });
    }

    // If email or phone number exists, return an error message
    if (checkResult.length > 0) {
      const existingField =
        checkResult[0].email === email ? "Email" : "Phone number";
      return res.status(400).json({
        error: `${existingField} already exists`,
      });
    }

    // Insert the employee if email and phone number are unique
    const query = `
      INSERT INTO employees (employee_id, first_name, last_name, email, phone_number, department, date_of_joining, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        employee_id,
        first_name,
        last_name,
        email,
        phone_number,
        department,
        date_of_joining,
        role,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.error("Error inserting employee into database:", insertErr);
          return res.status(500).json({ error: "Failed to add employee" });
        }

        res.status(201).json({ message: "Employee added successfully!" });
      }
    );
  });
});

module.exports = router;
