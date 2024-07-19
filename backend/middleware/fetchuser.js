const jwt = require('jsonwebtoken'); // Importing JSON Web Token (JWT) library
const jwt_sec = process.env.SECRET_KEY; // Secret key for JWT

// Middleware function to fetch user data using JWT token
const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header("auth-token");

  // If no token is provided, send an error response
  if (!token) {
    res.status(401).send({ error: "Please authenticate with a valid token" });
  }

  try {
    // Verify the token using the secret key
    const data = jwt.verify(token, jwt_sec);
    // Add user data to the request object
    req.users = data.users;
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, send an error response
    res.status(401).send({ error: "Please authenticate with a valid token" });
  }
}

module.exports = fetchuser; // Exporting the fetchuser middleware function
