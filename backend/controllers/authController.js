import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, regNo } = req.body;

    // Check if email or regNo already exists
    const userExists = await User.findOne({ $or: [{ email }, { regNo }] });
    if (userExists) {
      return res.status(400).json({ error: "Email or RegNo already exists" });
    }

    const user = await User.create({ name, email, password, regNo });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        regNo: user.regNo,
      },
    });
  } catch (err) {
    // Handle duplicate key error from MongoDB
    if (err.code === 11000) {
      return res.status(400).json({ error: "Duplicate email or regNo" });
    }

    // Log full error object for debugging
    console.error("Register error:", err);

    res.status(500).json({ error: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        regNo: user.regNo,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
