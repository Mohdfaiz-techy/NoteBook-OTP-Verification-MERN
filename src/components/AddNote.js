import React, { useContext, useState } from "react";
import noteContext from "../context/notes/contextNote";

const AddNote = (props) => {
  const context = useContext(noteContext); // Using the note context
  const { addNote } = context; // Destructuring addNote function from context
  const [note, setNote] = useState({ title: "", description: "", tag: "" }); // State to manage note input

  // Handle input changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // Update the state with input values
  };

  // Handle form submission
  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // Add note using the addNote function from context
    setNote({ title: "", description: "", tag: "" }); // Reset the note input fields

    props.showAlert("Added Note successfully", "success"); // Show success alert
  };

  return (
    <div className="container text-center">
      <h1>Add Your Note</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <textarea
          className="form-control"
          id="title"
          name="title"
          rows="1"
          onChange={onChange}
          value={note.title}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          onChange={onChange}
          value={note.description}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <textarea
          className="form-control"
          id="tag"
          name="tag"
          rows="1"
          onChange={onChange}
          value={note.tag}
        ></textarea>
      </div>

      <div className="my-2">
        <p><strong>Note:</strong> Description contains at least 5 characters</p>
      </div>

      {/* Submit button */}
      <div className="row my-5">
        <div className="col-lg-4"></div>
        <div className="d-grid gap-2 col-lg-4">
          <button
            disabled={note.description.length < 5} // Disable button if description is less than 5 characters
            className="btn btn-primary"
            type="button"
            onClick={onClick}
          >
            Add Note
          </button>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default AddNote;
