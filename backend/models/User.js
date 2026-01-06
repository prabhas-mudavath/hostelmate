import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    default: "student"
  },

  hostelId: String,
  roomNo: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
