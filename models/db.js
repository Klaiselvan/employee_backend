const { createClient } = require('@supabase/supabase-js'); // Import the Supabase client
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Check if the connection works by making a test   query
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('employees').select('*'); // Replace 'employees' with your table name
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return;
    }
    console.log('Connected to Supabase successfully!', data);
  } catch (err) {
    console.error('Error during connection test:', err.message);
  }
};

testConnection(); // Test the connection to Supabase

module.exports = supabase; // Export the Supabase client
