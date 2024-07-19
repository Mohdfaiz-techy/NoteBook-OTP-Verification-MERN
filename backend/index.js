// Import the function to connect to MongoDB
const connectToMongo = require('./db');

// Import necessary modules
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

// Create an instance of Express
const app = express();

// Define the port for the server
const port = 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON bodies for incoming requests
app.use(express.json());

// Routes for authentication and notes APIs
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
