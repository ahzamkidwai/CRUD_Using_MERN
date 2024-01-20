const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("We are inside authMiddleware.js file. Token is:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized HTTP, Token not provided",
    });
  }

  const jwtToken = token.replace("Bearer ", "");
  console.log("JWT Token is (inside authMiddleware.js):", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Value of isVerified is:", isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    console.log("Value of userData is:", userData);

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    //console.log("Request value inside authMiddleware:", req);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error("Token has expired. Expiration Time:", error.expiredAt);
      return res.status(401).json({ message: "Unauthorized. Token has expired." });
    } else {
      console.error("Error in authentication middleware:", error);
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
  }
};

module.exports = authMiddleware;
