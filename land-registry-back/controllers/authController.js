import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// 🟢 Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, city, email, password, walletAddress, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      city,
      email,
      password,
      walletAddress,
      role,
      landCard: req.file ? req.file.filename : null,
    });

    await newUser.save();

    // ✅ Include walletAddress and email in token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        walletAddress: newUser.walletAddress,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        walletAddress: newUser.walletAddress,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// 🟢 Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Include walletAddress and email in token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        walletAddress: user.walletAddress,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
