import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import { TickIcon, CrossIcon } from "../src/components/StatusIcon.jsx";

const run = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hostelmate");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      username: "admin",
      password: hashedPassword
    });

    console.log("<TickIcon />  Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("<CrossIcon /> Error creating admin:", error);
    process.exit(1);
  }
};

run();
