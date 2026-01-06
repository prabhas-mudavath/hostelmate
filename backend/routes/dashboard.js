import express from "express";
import Complaint from "../models/Complaints.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const hostelId = req.query.hostelId;

    const openComplaints = await Complaint.countDocuments({
      hostelId,
      status: { $ne: "Resolved" },
    });

    const resolvedComplaints = await Complaint.countDocuments({
      hostelId,
      status: "Resolved",
    });

    res.json({
      openComplaints,
      resolvedComplaints,
      todaysMeals: 4, // static for now
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});

export default router;
