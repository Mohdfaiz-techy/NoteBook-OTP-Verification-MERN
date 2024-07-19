import React, { useState, useRef, useEffect } from "react";
import OTPVerification from "./OTPVerification";
import SignUpForOTP from "./SignUpForOTP";

const SignUp = (props) => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); // Ref to reference the modal DOM element

  // Function to open the modal
  const openModal = () => setShowModal(true);

  // Function to close the modal
  const closeModal = () => setShowModal(false);

  // Effect to handle modal visibility changes
  useEffect(() => {
    if (showModal) {
      // Initialize Bootstrap modal when showModal state is true
      const bootstrap = window.bootstrap;
      const modal = new bootstrap.Modal(modalRef.current);
      modal.show(); // Show the modal
    }
  }, [showModal]);

  return (
    <>
      {/* Component for signing up with OTP */}
      <SignUpForOTP
        openModal={openModal} // Prop to open the OTP verification modal
        showAlert={props.showAlert} // Prop for showing alerts
      />

      {/* OTP verification modal */}
      <OTPVerification
        modalRef={modalRef} // Pass ref to OTP verification modal
        closeModal={closeModal} // Pass function to close the modal
        showAlert={props.showAlert} // Prop for showing alerts
      />
    </>
  );
};

export default SignUp;
