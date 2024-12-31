// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import "dotenv/config";
// import { User } from '../models/index.js';

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, name: user.name, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' }
//   );
// };

// // Register a new user
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     // Generate token
//     const token = generateToken(newUser);

//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login user
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

//     // Generate token
//     const token = generateToken(user);

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendResponse from "../helpers/sendResponse.js";
const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().min(3).max(30).required(),
  role : Joi.string().valid("admin", "donor", "receiver").default("receiver")
});

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return sendResponse(res, 400, null, true, error.message);
  const user = await User.findOne({ email: value.email });
  if (user)
    return sendResponse(
      res,
      403,
      null,
      true,
      "User with this email already registered."
    );

  const hashedPassword = await bcrypt.hash(value.password, 12);
  value.password = hashedPassword;

  let newUser = new User({ ...value });
  newUser = await newUser.save();

  sendResponse(res, 201, newUser, false, "User Registered Successfully");
}

export const login =  async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return sendResponse(res, 400, null, true, error.message);
  const user = await User.findOne({ email: value.email }).lean();
  if (!user)
    return sendResponse(res, 403, null, true, "User is not registered.");

  const isPasswordValid = await bcrypt.compare(value.password, user.password);
  if (!isPasswordValid)
    return sendResponse(res, 403, null, true, "Invalid Credentials.");

  var token = jwt.sign(user, process.env.AUTH_SECRET);

  sendResponse(res, 200, { user, token }, false, "User Login Successfully");
}


// router.post("/reset-password", (req, res) => {});
// router.post("/forger-password", (req, res) => {});