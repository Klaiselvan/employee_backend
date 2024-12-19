const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Add Employee Route
router.post("/add", async (req, res) => {
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

  // Validate required fields
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

  try {
    // Check if email or phone number already exists
    const { data: existingEmployee, error: checkError } = await supabase
      .from("employees")
      .select("*")
      .or(`email.eq.${email},phone_number.eq.${phone_number}`);

    if (checkError) {
      console.error("Error checking existing employee:", checkError.message);
      return res.status(500).json({ error: "Error checking existing records" });
    }

    if (existingEmployee.length > 0) {
      const existingField = existingEmployee[0].email === email ? "Email" : "Phone number";
      return res.status(400).json({
        error: `${existingField} already exists`,
      });
    }

    // Insert new employee
    const { data, error: insertError } = await supabase
      .from("employees")
      .insert([
        {
          employee_id,
          first_name,
          last_name,
          email,
          phone_number,
          department,
          date_of_joining,
          role,
        },
      ]);

    if (insertError) {
      console.error("Error inserting employee:", insertError.message);
      return res.status(500).json({ error: "Failed to add employee" });
    }

    res.status(201).json({ message: "Employee added successfully!", data });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Unexpected server error" });
  }
});

module.exports = router;
