const { validationResult } = require("express-validator"); // Importing validation result from express-validator
const User = require("../models/users"); // Importing the User model
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
const UserOTPVerification = require("../models/otp"); // Importing the UserOTPVerification model
const nodemailer = require("nodemailer"); // Importing nodemailer for sending emails
require("dotenv").config(); // Importing and configuring dotenv for environment variables
const jwt_sec = process.env.SECRET_KEY; // Secret key for JWT

// Function to send OTP for user verification
const sendOTPForUserVerification = async (user) => {
  try {
    // Generate a 4-digit OTP
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log("OTP:", otp);

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.user_Email, // Ensure this environment variable is set
        pass: process.env.user_pass, // Ensure this environment variable is set
      },
      tls: {
        rejectUnauthorized: false, // Use this if you face issues with TLS
      },
    });

    // Hash the OTP
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    // Create a new UserOTPVerification object
    let newUserOTPVerification = new UserOTPVerification({
      userId: user.id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // Expires in 1 hour (3600000 ms)
    });

    // Save the new UserOTPVerification object to the database
    newUserOTPVerification = await newUserOTPVerification.save();

    // Define the email options
    const mailOptions = {
      from: `"YourNoteBook" ${process.env.user_Email}`, // sender address
      to: "mohdfaiz000007@gmail.com", // list of receivers
      subject: "Verification For E-mail", // Subject line
      html: `<p>Copy your OTP: <b>${otp}</b> for E-mail verification</p>`, // HTML body content
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending OTP for user verification:", error);
  }
};

// Function to handle user registration
const handleCreateUser = async (req, res) => {
  let success = false;
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Check if a user already exists with the same email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "The user with this email already exists" });
    }

    // Create salt for hashing password
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create the user
    const users = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    // Send OTP for user verification
    sendOTPForUserVerification(users);
    success = true;
    res.json({ success, message: "The OTP is sent to your email account" });
  } catch (error) {
    console.error("Error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to handle user login
const handleLoginUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure email and password from request body
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    let users = await User.findOne({ email });
    let success = false;
    if (!users) {
      return res
        .status(400)
        .json({ success, error: "Enter the correct credentials" });
    }

    // Compare the provided password with the user's hashed password
    const passWordcompare = await bcrypt.compare(password, users.password);
    console.log(passWordcompare);
    if (!passWordcompare) {
      return res
        .status(400)
        .json({ success, error: "Enter the correct credentials" });
    }

    // Send OTP for user verification
    sendOTPForUserVerification(users);

    // Create a payload with the user's ID
    const payload = {
      users: {
        id: users.id,
      },
    };

    // Generate a JWT token with the payload and secret key
    const authToken = jwt.sign(payload, jwt_sec);
    success = true;
    res.json({ success, authToken: authToken });
  } catch (error) {
    console.error("Error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to handle fetching user data
const handleGetUser = async (req, res) => {
  try {
    // Get the user ID from the authentication token
    let userId = req.users.id;

    // Fetch the user data excluding the password
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error");
    res.status(500).send("Internal server error occurred");
  }
};

// Function to handle user OTP verification
const handleUserOTPVerification = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure email and OTP from request body
    const { email, otp } = req.body;
    console.log({ email, otp });

    // Find the user by email
    const users = await User.findOne({ email });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(users.email);
    console.log(users._id);

    // Find the OTP verification record by user ID
    const userOTP = await UserOTPVerification.findOne({ userId: users._id });
    if (!userOTP) {
      return res.status(404).json({ message: "OTP not found" });
    }
    console.log(userOTP.otp);

    // Check if the OTP has expired
    if (userOTP.expiresAt < Date.now()) {
      return res.status(400).json({ message: "The OTP has expired" });
    }

    // Compare the provided OTP with the hashed OTP
    const compareOTP = await bcrypt.compare(otp, userOTP.otp);
    console.log(compareOTP);

    if (!compareOTP) {
      return res
        .status(400)
        .json({ message: "The OTP is incorrect or expired" });
    }
    const success = true;

    return res.json({ success });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Function to handle resending OTP for user verification
const handleResendOTPVerification = async (req, res) => {
  const { email } = req.body;
  console.log({ email });

  // Find the user by email
  const users = await User.findOne({ email });
  if (!users) {
    return res.status(401).json({ error: "Account doesn't exist" });
  }
  console.log(users.email);
  console.log(users._id);

  // Find and delete existing OTP verification records for the user
  let userOTP = await UserOTPVerification.find({ userId: users._id });
  if (!userOTP) {
    return res.json({ Error: "The Email does not exist" });
  }
  console.log(users._id);

  console.log(userOTP);
  userOTP = await UserOTPVerification.deleteMany({ userId: users._id });
  console.log(userOTP);

  // Find the user by ID
  const user = await User.findById({ _id: users._id });
  console.log(user);
  if (!user) {
    return res.json({ Error: "The Email does not exist" });
  }

  // Send OTP for user verification
  sendOTPForUserVerification(user);
  return res.json({ message: "The OTP is sent to your email" });
};

module.exports = {
  handleCreateUser,
  handleLoginUser,
  handleGetUser,
  handleUserOTPVerification,
  handleResendOTPVerification,
};
