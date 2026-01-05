import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  hostelId: String,
  title: String,
  category: String,
  status: {
    type: String,
    default: "Raised"
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Complaint", complaintSchema);
