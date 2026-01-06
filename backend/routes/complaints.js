import express from "express";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* GET COMPLAINTS BY HOSTEL */
router.get("/complaints", authMiddleware, adminMiddleware, async (req, res) => {
  const filter =
    req.user.role === "warden"
      ? { hostelId: req.user.hostelId }
      : {}; // chief sees all

  const complaints = await Complaint.find(filter);
  res.json(complaints);
});

export default router;
