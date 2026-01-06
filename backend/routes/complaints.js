import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Complaint from "../models/Complaints.js";

const router = express.Router();

/* USER: ADD COMPLAINT */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      userId: req.user.id,
      status: "Raised",
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to add complaint" });
  }
});

/* ADMIN: VIEW ALL COMPLAINTS */
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

export default router;
