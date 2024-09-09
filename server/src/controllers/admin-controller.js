import { body, validationResult } from "express-validator";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Middleware for validation
export const validateAdmin = [
  body("email").isEmail().withMessage("The email address format is invalid."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

// Add Admin function
export const addAdmin = async (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed. Please review the following:",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Check if the admin already exists
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message:
          "An account with this email already exists. Please try another email.",
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new admin
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save(); // Save the new admin to the database

    // Return success response
    return res.status(201).json({
      message: "Admin account created successfully.",
      admin: { email: admin.email, id: admin._id },
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

// Admin Login function
export const adminLogin = async (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed. Please review the following:",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Check if the admin exists
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(401).json({
        message: "No admin found with the provided email address.",
      });
    }

    // Verify password
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials. Please check your email and password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return success response
    return res.status(200).json({
      message: "Authentication successful. Welcome!",
      token,
      id: existingAdmin._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

//  get admin function
export const getAdmin = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (error) {
    return console.log("error");
  }
  if (!admins) {
    return res.status(404).json({ message: "No admins found" });
  }
  return res.status(200).json({ admins });
};
