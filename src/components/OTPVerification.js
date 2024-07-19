import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({ modalRef, showAlert }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    otp_email: "",
    otp: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled/enabled
  const [timer, setTimer] = useState(0); // State to manage countdown timer
  const modalInstance = useRef(null);
  const intervalRef = useRef(null);

  // Initialize the modal instance using Bootstrap's modal
  useEffect(() => {
    if (modalRef && modalRef.current) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    }
  }, [modalRef]);

  // Timer logic to handle countdown and enable button after 2 minutes
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setIsButtonDisabled(false); // Enable button after timer ends
    }

    return () => clearInterval(intervalRef.current); // Clear interval on component unmount
  }, [timer]);

  // Handle OTP submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/auth/userOTPVerification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.otp_email,
          otp: credentials.otp,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Store token in local storage
      localStorage.setItem("token", json.authToken);
      showAlert("Account created successfully", "success");
      
      // Hide the modal
      if (modalInstance.current) {
        modalInstance.current.hide();
      }

      // Delay navigation to ensure modal closes before redirecting
      setTimeout(() => {
        navigate("/Login");
      }, 300);
    } else {
      showAlert("Invalid credentials", "danger");
      
      // Keep the modal open if OTP verification fails
      if (modalInstance.current) {
        modalInstance.current.show();
      }
    }
  };

  // Handle input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle OTP resend
  const onClick = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable the button
    setTimer(120); // Start the timer for 2 minutes (120 seconds)
    const response = await fetch(
      `http://localhost:5000/api/auth/resendOTPVerification/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.otp_email,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <h4 className="text-center">The OTP has been sent to your Mail</h4>
              <div className="mb-3">
                <label htmlFor="otp_email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="otp_email"
                  name="otp_email"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="otp"
                  name="otp"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer text-start d-flex">
              <button type="submit" className="btn btn-primary mt-2 col-8 mx-auto">
                Submit
              </button>
            </div>
          </form>
          <div className="text-center my-3">
            <p className="text-center">
              The OTP resend in <b>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</b>
            </p>
            <form onSubmit={onClick}>
              <button type="submit" className={`btn btn-secondary col-8 mx-auto ${isButtonDisabled ? 'disabled' : ''}`}>
                Resend OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
