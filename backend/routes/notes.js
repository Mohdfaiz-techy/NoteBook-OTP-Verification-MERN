// Import necessary modules
const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body } = require("express-validator");

// Import controller functions
const { handleFetchAllNote, handleCreateNewNote, handleUpdateNote, handleDeleteNote } = require("../Controllers/noteController");

// Create an instance of Express router
const router = express.Router();

// ROUTE 1: Fetch all notes using GET /api/notes/fetchallnotes (login required)
router.get("/fetchallnotes", fetchuser,
  handleFetchAllNote);

// ROUTE 2: Add new note using POST /api/notes/addnote (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    // Validate title, description, and tag using express-validator
    body("title", "Title should be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description should be at least 5 characters").isLength({
      min: 5,
    }),
    body("tag", "Tag should be at least 3 characters").isLength({ min: 3 }),
  ],
  handleCreateNewNote
);

// ROUTE 3: Update an existing note using PUT /api/notes/updatenote/:id (login required)
router.put("/updatenote/:id", fetchuser,
  handleUpdateNote);

// ROUTE 4: Delete an existing note using DELETE /api/notes/deletenote/:id (login required)
router.delete("/deletenote/:id", fetchuser,
  handleDeleteNote);

// Export the router for use in other parts of the application
module.exports = router;
