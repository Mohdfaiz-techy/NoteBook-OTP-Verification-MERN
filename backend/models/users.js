// Import the mongoose module
const mongoose = require('mongoose');

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for User
const UserSchema = new Schema({
    name: {
        type: String,
        required: true, // name is required and should be of type String
    },
    email: {
        type: String,
        required: true, // email is required and should be of type String
        unique: true, // email should be unique
    },
    password: {
        type: String,
        required: true, // password is required and should be of type String
    },
    date: {
        type: Date,
        default: Date.now, // date will default to the current date and time
    }
});

// Create a model using the schema
const User = mongoose.model("user", UserSchema);

// Export the model for use in other parts of the application
module.exports = User;
