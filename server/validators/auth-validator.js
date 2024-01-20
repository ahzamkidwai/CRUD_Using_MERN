const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "E-Mail is required" })
    .trim()
    .email({ message: "Invalid E-Mail Address" })
    .min(10, { message: "Minimum Length should be 10" })
    .max(255, { message: "Maximum Length should be 255" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(255, { message: "Password can be upto 255 characters" }),
});

// Creating an Object Schema
const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(50, { message: "Maximum characters allowed in Name Field is 50" }),
  email: z
    .string({ required_error: "E-Mail is required" })
    .trim()
    .email({ message: "Invalid E-Mail Address" })
    .min(10, { message: "Minimum Length should be 10" })
    .max(255, { message: "Maximum Length should be 255" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone should be atleast 10 numbers" })
    .max(10, { message: "Phone should be at max 10" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(255, { message: "Password can be upto 255 characters" }),
});

module.exports = { signUpSchema, loginSchema };
