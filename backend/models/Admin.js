import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
