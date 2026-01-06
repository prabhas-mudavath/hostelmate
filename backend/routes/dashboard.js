import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import Complaint from "../models/Complaints.js";
import Laundry from "../models/Laundry.js";
import ServiceRequest from "../models/ServiceRequest.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const filter =
      req.user.role === "warden"
        ? { hostelId: req.user.hostelId }
        : {};

    const openComplaints = await Complaint.countDocuments({
      ...filter,
      status: { $ne: "Resolved" },
    });

    const resolvedComplaints = await Complaint.countDocuments({
      ...filter,
      status: "Resolved",
    });

    const laundryPending = await Laundry.countDocuments({
      ...filter,
      status: "Pending",
    });

    const servicePending = await ServiceRequest.countDocuments({
      ...filter,
      status: "Pending",
    });

    res.json({
      openComplaints,
      resolvedComplaints,
      laundryPending,
      servicePending,
    });
  }
);

export default router;
