import express from "express";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* -------- DASHBOARD STATS -------- */
router.get("/:hostelId", async (req, res) => {
  try {
    const hostelId = req.params.hostelId;

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
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
});

export default router;
