const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    console.log("Parse Body : ", parseBody);
    console.log("Request Body : ", req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Asynchronous parsing can not be done. VALIDATION FAILED",
      msg: error.errors[0].message,
    });
  }
};

module.exports = validate;
