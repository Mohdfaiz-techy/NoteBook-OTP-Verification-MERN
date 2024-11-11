import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation(); // Hook to get the current location
  let navigate = useNavigate(); // Hook to navigate programmatically

  // Effect to log the current path whenever it changes
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  // Function to handle logout
  const onClick = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/Login"); // Navigate to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Navbar">
          NoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-Link  text-decoration-none mx-2 ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link
                className={`nav-Link text-decoration-none mx-2  ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/About"
              >
                About Us
              </Link> */}
            </li>
          </ul>
          {/* Conditional rendering based on token presence in local storage */}
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/Login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/SignUp" role="button">
                SignUp
              </Link>
            </form>
          ) : (
            <Link
              className="btn btn-primary mx-1"
              onClick={onClick}
              to="/Login"
              role="button"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
