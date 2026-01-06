import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,

  role: {
    type: String,
    enum: ["warden", "chief"]
  },

  hostelId: {
    type: String,
    default: null // chief warden has null
  }
});

export default mongoose.model("Admin", adminSchema);
