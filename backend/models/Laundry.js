import mongoose from "mongoose";

const laundrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  room: {
    type: String,
    required: true
  },
  laundryType: {
    type: String,
    required: true
  },
  clothesCount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Laundry = mongoose.model("Laundry", laundrySchema);
export default Laundry;
