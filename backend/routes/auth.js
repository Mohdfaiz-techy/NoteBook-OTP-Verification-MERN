// Import necessary modules
const express = require('express');
const { body } = require('express-validator');

// Import middleware and controller functions
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { handleCreateUser, handleLoginUser, handleGetUser, handleUserOTPVerification, handleResendOTPVerification } = require('../Controllers/authController');

// ROUTE 1: Create a user using POST /api/auth/create-user (login not required)
router.post('/create-user', [
    // Validate name, email, and password using express-validator
    body('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
],
handleCreateUser);

// ROUTE 2: Authenticate a user using POST /api/auth/login
router.post('/login', [
    // Validate email and password using express-validator
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
handleLoginUser);

// ROUTE 3: Get a user using POST /api/auth/getuser
router.post('/getuser', fetchuser,
handleGetUser);

// ROUTE 4: Verify OTP of a user sent via email using POST /api/auth/userOTPVerification
router.post('/userOTPVerification', [
    // Validate OTP using express-validator
    body('otp', 'OTP cannot be blank').exists(),
],
handleUserOTPVerification);

// ROUTE 5: Resend OTP of a user sent via email using POST /api/auth/resendOTPVerification
router.post('/resendOTPVerification', [
    // Validate OTP using express-validator
    body('otp', 'OTP cannot be blank').exists(),
],
handleResendOTPVerification);

// Export the router for use in other parts of the application
module.exports = router;
