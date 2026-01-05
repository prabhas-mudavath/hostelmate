import express from "express";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* GET COMPLAINTS BY HOSTEL */
router.get("/:hostelId", async (req, res) => {
  const hostelId = req.params.hostelId;

  const complaints = await Complaint.find({ hostelId })
    .sort({ createdAt: -1 });

  res.json(complaints);
});

export default router;
