const express = require("express");
const router = express.Router();
const contactUsForm = require("../controllers/contact-controller");

router.route("/contact").post(contactUsForm);

module.exports = router;
