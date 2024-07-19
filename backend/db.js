// Import mongoose and dotenv for environment variables
const mongoose = require('mongoose');
require("dotenv").config();

// Construct the MongoDB connection URI using environment variable for database name
const mongoURI = `mongodb://localhost:27017/${process.env.DB_NAME}`;

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        // Disable strict mode for queries (optional)
        mongoose.set('strictQuery', false);

        // Connect to MongoDB using mongoose
        await mongoose.connect(mongoURI);

        // Log successful connection
        console.log('MongoDB Connected successfully...');
    } catch (err) {
        // Log error message if connection fails
        console.error(err.message);
        
        // Exit the Node.js process with failure status
        process.exit(1);
    }
}

// Export the connectToMongo function for use in other parts of the application
module.exports = connectToMongo;
