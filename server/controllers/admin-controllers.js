const User = require("../models/user-model");
const ContactUs = require("../models/contact-model");

const getAllUsers = async (req, res) => {
  try {
    const usersData = await User.find({}, { password: 0 });
    if (!usersData || usersData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user exists",
      });
    }
    console.log(usersData);
    return res.status(200).json({ usersData });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Message occured while fetching details",
    });
  }
};

const getContactDetails = async (req, res) => {
  try {
    const contactDetails = await ContactUs.find({});
    if (!contactDetails || contactDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contact message exists",
      });
    }
    return res.status(200).json({
      success: true,
      contactDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Problem occured while fetching contact details",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("User jsiko find karna hian uski id hain ", id);
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json({
      success: true,
      message: "getUserById is successfully done",
      data,
    });
  } catch (error) {
    next(error)
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(
      "User jisko delete karna hain uski id hain (Humlog abhi admin-controller mei hain) : ",
      id
    );
    await User.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getContactDetails,
  deleteUserById,
  getUserById,
};
