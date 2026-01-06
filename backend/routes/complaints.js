import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* CREATE COMPLAINT (STUDENT) */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      userId: req.user.id,
      status: "Raised",
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to create complaint" });
  }
});

/* GET USER COMPLAINTS */
router.get("/", authMiddleware, async (req, res) => {
  const complaints = await Complaint.find({ userId: req.user.id })
    .sort({ createdAt: -1 });
  res.json(complaints);
});

export default router;
