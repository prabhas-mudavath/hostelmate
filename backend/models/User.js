import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "warden", "chief"],
    default: "student",
  },
  hostelId: String,
});

export default mongoose.model("User", userSchema);
