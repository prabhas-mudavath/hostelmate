import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["warden", "chief"],
      default: "warden",
    },
    hostelId: {
      type: String, // SSB, CVR, ALL
      default: "ALL",
    },
  }
);

export default mongoose.model("Admin", AdminSchema);
