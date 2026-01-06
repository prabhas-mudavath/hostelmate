import mongoose from "mongoose";

const ServiceDirectorySchema = new mongoose.Schema(
  {
    hostelId: String,
    serviceType: String,
    contactName: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("ServiceDirectory", ServiceDirectorySchema);
