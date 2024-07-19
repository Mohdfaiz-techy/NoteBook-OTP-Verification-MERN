import React from 'react';

// Alert component to display alert messages
const Alert = (props) => {
  // Function to capitalize the first letter of the word
  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error"; // Change "danger" to "Error"
    }
    const lower = word.toLowerCase(); // Convert word to lowercase
    return lower.charAt(0).toUpperCase() + lower.slice(1); // Capitalize the first letter
  };

  return (
    <div style={{ height: '50px' }}> {/* Set a fixed height for the alert container */}
      {props.alert && ( /* Render alert only if props.alert exists */
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} {/* Display capitalized alert type and message */}
        </div>
      )}
    </div>
  );
};

export default Alert;
