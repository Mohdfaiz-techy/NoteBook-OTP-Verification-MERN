// Import the mongoose module
const mongoose = require('mongoose');

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for UserOTPVerification
const UserOTPVerificationSchema = new Schema({
    userId: {
        type: String,
        required: true, // userId is required and should be of type String
    },
    otp: {
        type: String,
        required: true, // otp is required and should be of type String
    },
    createdAt: {
        type: Date,
        default: Date.now, // createdAt will default to the current date and time
    },
    expiresAt: {
        type: Date,
        default: Date.now, // expiresAt will also default to the current date and time (this might be intended to be changed)
    }
});

// Create a model using the schema
const UserOTPVerification = mongoose.model("UserOTPVerification", UserOTPVerificationSchema);

// Export the model for use in other parts of the application
module.exports = UserOTPVerification;
