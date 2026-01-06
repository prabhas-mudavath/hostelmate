import express from "express";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* DASHBOARD STATS */
router.get("/:hostelId", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

export default router;
