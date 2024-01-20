const express = require("express");
const adminController = require("../controllers/admin-controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router
  .route("/users/:id")
  .get(authMiddleware,  adminController.getUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminController.deleteUserById);

router
  .route("/contacts")
  .get(authMiddleware, adminController.getContactDetails);

module.exports = router;
