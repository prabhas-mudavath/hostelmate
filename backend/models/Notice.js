import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    hostelId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    date: {
      type: String,
      default: () => new Date().toDateString(),
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
