import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    {
      id: user._id,
      role: "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, role: "user" });
};

export const registerUser = async (req, res) => {
  res.json({ message: "Register working" });
};
