const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const homePage = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page using Router using Controllers");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    // Use findOne to check if the user with the given email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const userData = await User.create({ username, email, phone, password });
    console.log(userData);

    return res.status(200).json({
      success: true,
      message: "User data entered successfully",
      msg: userData,
      token: await userData.generateToken(),
      userId: userData._id.toString(),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Cannot Register Data in DB",
    });
  }
};

// Login Handler

const login = async (req, res) => {
  try {
    // Data Fetch from request body
    const { email, password } = req.body;
    // Check that the email entered by user is registered or not
    const existingUser = await User.findOne({ email });
    console.log("User exists : ", existingUser);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check for hashed password using bcrypt.comapre

    const isPasswordValid = existingUser.comparePassword(password);

    if (isPasswordValid) {
      return res.status(200).json({
        success: true,
        message: "Login Successfull",
        token: await existingUser.generateToken(),
        userId: existingUser._id.toString(),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check you credentials again, User cannot be logged In.",
      error: error.message,
    });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data in auth-controller : ", userData);

    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { homePage, register, login, user };
