import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Complaint from "../models/Complaints.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const complaints = await Complaint.find({ hostelId: req.query.hostelId });
  res.json(complaints);
});

router.post("/", authMiddleware, async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.status(201).json(complaint);
});

export default router;
