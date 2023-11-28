//The middleware function starts with a try-catch block to handle any potential errors during the authentication process.
//Here's a breakdown of the logic:

// The token variable is extracted from the Authorization header of the incoming request.
// The header value is split at the space character, and the second part (index 1) contains the token.
// The jwt.verify() function is used to verify the token's authenticity and integrity.
// It takes the token and a secret key (process.env.jwt_secret) as parameters.
// If the token is successfully verified, the decodedToken object contains the decoded payload.
// In this case, the userId property is extracted from the payload and added to the req.body object for further processing.
// The next() function is called to pass control to the next middleware or route handler.
// If an error occurs during token verification, the catch block is executed.
// The error message is logged to the console, and a JSON response with a
// 403 status code and an error message is sent back to the client.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({
      success: false,
      message: "Forbidden: Invalid or expired token",
    });
  }
};
