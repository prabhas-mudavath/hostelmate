import express from "express";
import Complaint from "../models/Complaints.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* DASHBOARD STATS */
router.get("/:hostelId", authMiddleware, async (req, res) => {
  const { hostelId } = req.params;

  try {
    const openComplaints = await Complaint.countDocuments({
      hostelId,
      status: { $ne: "Resolved" }
    });

    const resolvedComplaints = await Complaint.countDocuments({
      hostelId,
      status: "Resolved"
    });

    res.json({
      openComplaints,
      resolvedComplaints,
      todaysMeals: 4 // static for now
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});

export default router;
