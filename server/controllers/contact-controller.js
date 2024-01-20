const Contact = require("../models/contact-model");

const contactUsForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const contactData = await Contact.create({ username, email, message });
    console.log(contactData);
    return res.status(200).json({
      success: true,
      message: "Contact us form created Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There is an error in creating Contact us form",
      msg: error.message,
    });
  }
};

module.exports = contactUsForm;
