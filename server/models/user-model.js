const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Concept of Pre-Middleware
userSchema.pre("save", async function (next) {
  const user = this;
  //console.log("User is : ", user);
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

// JSON Web Token - JWT
/*
Tokens such as JWT are typically not stored in the database along with other users details.
Instead, they are issued by the server during the authentication process and then stored
on the client-side (e.g. in the cookies or local storage) for later use.
*/

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
        username: this.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      Message: "JWT Token Cannot be generated due to some error",
    });
  }
};

// Compare Password using bcrypt

userSchema.methods.comparePassword = async function (password) {
  try {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Compare Password cannot be done",
    });
  }
};

module.exports = new mongoose.model("User", userSchema);
