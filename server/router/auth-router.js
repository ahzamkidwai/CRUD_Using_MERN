const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(authControllers.homePage);

// For registering user
//router.post("/register", register);
router
  .route("/register")
  .post(validate(signUpSchema), authControllers.register);

// For Logging User
router.route("/login").post(validate(loginSchema), authControllers.login);

// For Verifying that the user logged in is correct User by comparing JWT
router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
