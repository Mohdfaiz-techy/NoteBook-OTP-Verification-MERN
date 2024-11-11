import React, { useContext } from "react";
import noteContext from "../context/notes/contextNote";

const NoteItem = (props) => {
  const { note, updateNote } = props; // Destructuring props to extract note and updateNote function
  const context = useContext(noteContext); // Accessing note context
  const { deleteNote } = context; // Destructuring deleteNote function from context

  return (
    <div className="col-lg-3">
      {/* Card displaying note details */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5> {/* Title of the note */}
          <p className="card-text">{note.description} </p>{" "}
          {/* Description of the note */}
          {/* Delete icon/button */}
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id); // Calling deleteNote function from context with note id
              props.showAlert("Delete Note successfully", "success"); // Showing success alert from props
            }}
          ></i>
          {/* Edit icon/button */}
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              updateNote(note); // Calling updateNote function from props with current note
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
