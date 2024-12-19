const express = require("express");
const cors = require("cors");
const db = require("./models/db"); // Import MySQL database connection
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Get the frontend URL from environment variable (for production deployment)

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add other necessary headers
  })
);

app.use(express.json()); // Parse JSON requests

// Test route to verify database connection
app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Database test query failed:", err.message);
      return res.status(500).json({ error: "Database connection failed" });
    }
    res.json({ message: "Database connected successfully!", results });
  });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
