const Services = require("../models/services-model");

const insertCourse = async (req, res) => {
  const { service, description, price, provider } = req.body;

  if (!service || !description || !price || !provider) {
    return res.status(404).status.json({
      success: false,
      message: "Enter the course details correct",
    });
  }

  const courseData = await Services.create({
    service,
    description,
    price,
    provider,
  });

  console.log("Course Data inside InsertCourse function : ", courseData);

  return res.status(200).json({
    success: true,
    message: "Course Detailed Entered Successfully.",
  });
};

const services = async (req, res) => {
  try {
    const response = await Services.find();
    if (response) {
      console.log("Services ka response hain : \n", response);
      return res.status(200).json({
        success: true,
        message: "All Services are fetched successfully",
        courses: response,
      });
    } else if (!response) {
      return res.status(404).json({
        success: false,
        message: "No services Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      errormsg: error.message,
      Message: "Error occured while fetching services details",
    });
  }
};

module.exports = { services, insertCourse };
