import React, { useState } from "react";

// Component for user sign-up with OTP functionality
const SignUpForOTP = (props) => {
  // useState hook to manage form credentials state
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const response = await fetch(`http://localhost:5000/api/auth/create-user`, {
      method: "POST", // HTTP method for creating a new user
      headers: {
        "Content-Type": "application/json", // Specifies the request body format as JSON
      },
      body: JSON.stringify({
        name: credentials.name, // Includes the name in the request body
        email: credentials.email, // Includes the email in the request body
        password: credentials.password, // Includes the password in the request body
      }),
    });
    const json = await response.json(); // Parses the JSON response
    console.log(json); // Logs the response for debugging
    if (json.success) {
      props.openModal(); // Calls the openModal function if the user creation is successful
      // props.showAlert("Account created successfully", "success"); // Optionally shows a success alert
    } else {
      props.showAlert("Invalid credentials", "danger"); // Shows an alert if the credentials are invalid
    }
  };

  // Function to handle input changes and update the state
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); // Updates the specific field in the state
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <h3>
            Create an account to use <strong>YOURNOTEBOOK</strong>
          </h3>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name} // Binds the name input to the state
            onChange={onChange} // Calls the onChange function on input change
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email} // Binds the email input to the state
            onChange={onChange} // Calls the onChange function on input change
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password} // Binds the password input to the state
            onChange={onChange} // Calls the onChange function on input change
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUpForOTP;
