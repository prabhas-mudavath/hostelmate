import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Complaint from "../models/Complaints.js";

const router = express.Router();

router.get("/:hostelId", authMiddleware, async (req, res) => {
  const { hostelId } = req.params;

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
    todaysMeals: 3, // static for now
  });
});

export default router;
