import noteContext from "./contextNote"; // Import the noteContext from the contextNote file
import { useState } from "react";

// Define the NoteState component which provides state management for notes
const NoteState = (props) => {
  const host = "http://localhost:5000/"; // Base URL for the API

  const noteInitial = []; // Initial state for notes, an empty array
  const [notee, setNotes] = useState(noteInitial); // useState hook to manage the notes state

  // Function to fetch all notes from the API
  const getNote = async () => {
    // API call to fetch all notes
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET", // HTTP method for fetching notes
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Auth token from local storage
      },
    });

    const note = await response.json(); // Parse the JSON response
    console.log(note); // Log the notes for debugging
    setNotes(note); // Update the state with the fetched notes
  };

  // Function to add a new note
  const addNote = async (title, description, tag) => {
    // API call to add a new note
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST", // HTTP method for adding a note
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Auth token from local storage
      },
      body: JSON.stringify({ title, description, tag }), // Request body containing the new note data
    });

    const note = await response.json(); // Parse the JSON response
    setNotes(notee.reduce(function(notee){ return notee.concat(note);}, [])); // Add the new note to the current state
    console.log(note); // Log the added note for debugging
  };

  // Function to delete a note by ID
  const deleteNote = async (id) => {
    // API call to delete a note
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE", // HTTP method for deleting a note
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Auth token from local storage
      },
    });
    console.log("deleting note with id _" + id); // Log the deletion for debugging
    const json = await response.json(); // Parse the JSON response
    console.log(json); // Log the response for debugging
    const newNote = notee.filter((note) => {
      return note._id !== id; // Filter out the deleted note
    });
    setNotes(newNote); // Update the state with the remaining notes
  };

  // Function to edit a note by ID
  const editNote = async (id, title, description, tag) => {
    // API call to edit a note
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT", // HTTP method for updating a note
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Auth token from local storage
      },
      body: JSON.stringify({ title, description, tag }), // Request body containing the updated note data
    });
    const json = await response.json(); // Parse the JSON response
    console.log(json); // Log the response for debugging

    // Logic to update the note in the state without reloading the page
    let newNote = JSON.parse(JSON.stringify(notee));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote); // Update the state with the edited note
  };

  return (
    // Provide the note state and functions to the rest of the application
    <noteContext.Provider value={{ notee, addNote, getNote, deleteNote, editNote }}>
      {props.children} {/* Render any child components */}
    </noteContext.Provider>
  );
};

export default NoteState; // Export the NoteState component
