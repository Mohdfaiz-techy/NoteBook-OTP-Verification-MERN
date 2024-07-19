import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/contextNote";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const context = useContext(noteContext); // Accessing context for notes
  const { editNote, getNote, notee } = context; // Destructuring context values
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Effect to load notes when component mounts
    if (localStorage.getItem('token')) {
      getNote(); // Fetching notes if user is authenticated
    } else {
      navigate('/Login'); // Redirecting to login if user is not authenticated
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null); // Ref for triggering modal open
  const refClose = useRef(null); // Ref for closing modal

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // Function to populate modal with current note data for editing
  const updateNote = (currentNote) => {
    ref.current.click(); // Triggering modal open
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Function to update state on input change
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Function to handle update note submission
  const onclick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag); // Calling editNote function from context
    refClose.current.click(); // Closing the modal
    props.showAlert("Updated Note successfully", "success"); // Showing success alert
  };

  return (
    <div>
      {/* Add note section */}
      <AddNote showAlert={props.showAlert} />

      {/* Update section */}
      {/* Button to trigger modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Your Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form for editing note */}
              <div className="container text-center">
                <div className="mb-3 ">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <textarea
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    rows="1"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <textarea
                    className="form-control"
                    id="etag"
                    name="etag"
                    rows="1"
                    value={note.etag}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {/* Buttons to close and update note */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.edescription.length < 5}
                className="btn btn-primary"
                onClick={onclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section to display notes */}
      <h1>Your Notes</h1>
      {notee.length === 0 && "There are no notes at this time"}
      <div className="row my-3">
        {notee.map((note) => (
          <NoteItem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Note;
