const { validationResult } = require("express-validator"); // Importing validation result from express-validator
const notes = require("../models/Notes"); // Importing the Notes model

// Function to fetch all notes for a user
const handleFetchAllNote = async (req, res) => {
  try {
    // Fetch all notes by using user id
    const note = await notes.find({ user: req.users.id });
    res.json(note);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to create a new note
const handleCreateNewNote = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure title, description, tag from req.body
    const { title, description, tag } = req.body;

    // Create a new note object
    const note = new notes({
      title,
      description,
      tag,
      user: req.users.id,
    });

    // Save the new note to the database
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to update an existing note
const handleUpdateNote = async (req, res) => {
  // Destructure title, description, tag from req.body
  const { title, description, tag } = req.body;

  // Create a new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find note and update it by user id
    let note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the user is the same by user id
    if (note.user.toString() !== req.users.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to delete an existing note
const handleDeleteNote = async (req, res) => {
  // Find note and delete it
  try {
    let note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the user is the same by user id
    if (note.user.toString() !== req.users.id) {
      return res.status(401).send("Not allowed");
    }

    // Logic for note deletion
    note = await notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted successfully", note: note });
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal server error occurred");
  }
};

// Exporting the functions
module.exports = {
  handleFetchAllNote,
  handleCreateNewNote,
  handleUpdateNote,
  handleDeleteNote,
};
