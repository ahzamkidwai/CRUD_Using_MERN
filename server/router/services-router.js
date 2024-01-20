const express = require("express");
const router = express.Router();
const {services, insertCourse} = require("../controllers/services-controllers");

router.route("/services").get(services);
router.route("/insertData").post(insertCourse);

module.exports = router;
