import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing required components from react-router-dom for routing
import Navbar from "./components/Navbar"; // Importing the Navbar component
import About from "./components/About"; // Importing the About component
import Home from "./components/Home"; // Importing the Home component
import NoteState from "./context/notes/noteState"; // Importing the NoteState context provider
import Alert from "./components/Alert"; // Importing the Alert component
import SignUp from "./components/SignUp"; // Importing the SignUp component
import Login from "./components/Login"; // Importing the Login component
import { useState } from "react"; // Importing useState hook from React
import OTPVerification from "./components/OTPVerification"; // Importing the OTPVerification component

// Main App component
function App() {
  const [alert, setAlert] = useState(null); // State to manage alert messages

  // Function to show alert messages
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    // Hide the alert message after 1.5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      {" "}
      {/* Wrapping the application in the NoteState provider */}
      <Router>
        {" "}
        {/* Wrapping the application in the Router for routing */}
        <Navbar /> {/* Rendering the Navbar component */}
        <Alert alert={alert} />{" "}
        {/* Rendering the Alert component and passing the alert state */}
        <div className="container my-3">
          {" "}
          {/* Container for the main content with some margin */}
          <Routes>
            {" "}
            {/* Defining the routes for the application */}
            {/* <Route path="/About" element={<About />}></Route> Route for the About component */}
            <Route
              path="/Home"
              element={<Home showAlert={showAlert} />}
            ></Route>{" "}
            {/* Route for the Home component with showAlert prop */}
            <Route
              path="/Login"
              element={<Login showAlert={showAlert} />}
            ></Route>{" "}
            {/* Route for the Login component with showAlert prop */}
            <Route
              path="/SignUp"
              element={<SignUp showAlert={showAlert} />}
            ></Route>{" "}
            {/* Route for the SignUp component with showAlert prop */}
            <Route
              path="/otp"
              element={<OTPVerification showAlert={showAlert} />}
            ></Route>{" "}
            {/* Route for the OTPVerification component with showAlert prop */}
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App; // Exporting the App component as the default export
