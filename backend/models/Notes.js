const mongoose = require('mongoose'); // Importing Mongoose library
const { Schema } = mongoose; // Destructuring Schema from Mongoose

// Defining the Notes schema
const NotesSchema = new Schema({
  // User field to store reference to the user who owns the note
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to an ObjectId in the user collection
    ref: 'user' // Refers to the 'user' collection
  },
  // Title field for the note
  title: {
    type: String, // Title is of type String
    required: true, // Title is required
  },
  // Description field for the note
  description: {
    type: String, // Description is of type String
    required: true, // Description is required
  },
  // Tag field for the note
  tag: {
    type: String, // Tag is of type String
    default: 'General', // Default value for tag is 'General'
  },
  // Date field for the note
  date: {
    type: Date, // Date is of type Date
    default: Date.now // Default value is the current date and time
  }
});

module.exports = mongoose.model("notes", NotesSchema); // Exporting the Notes schema as a Mongoose model
