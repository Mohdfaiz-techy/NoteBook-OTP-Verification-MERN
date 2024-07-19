import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // State to store user credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // Hook to navigate programmatically
  const navigate = useNavigate();
  
  // Function to handle navigation to the sign-up page
  const onClick = () => {
    navigate('/signUp');
  };

  // Function to handle form submission for login
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // Method type
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // Body data must match "Content-Type" header
    });
    const json = await response.json(); // Parse the JSON response

    console.log(json);
    if (json.success) {
      // Save auth token in local storage and redirect on successful login
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account created successfully", "success");
      navigate("/home");
    } else {
      // Show error alert if credentials are invalid
      props.showAlert("Invalid credentials", "danger");
    }
  };

  // Function to handle changes in the input fields
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Form for login */}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <h3>
            Logged in to use <strong>YOURNOTEBOOK</strong>
          </h3>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
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
            name="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div id="" className="form-text">
          <p>
            Don't have an account?
            <span onClick={onClick} style={{ cursor: "pointer", color: "red" }}>
              {" "}
              Register
            </span>
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
