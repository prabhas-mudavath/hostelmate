import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Complaint from "../models/Complaints.js";
import Notice from "../models/Notice.js";

const router = express.Router();

/* ===============================
   ADMIN ADD NOTICE
   =============================== */
router.post(
  "/notice",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const notice = await Notice.create(req.body);
      res.status(201).json({
        message: "Notice added successfully",
        notice,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to add notice",
        error: err.message,
      });
    }
  }
);

/* ===============================
   GET ALL COMPLAINTS
   =============================== */
router.get(
  "/complaints",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  }
);

/* ===============================
   UPDATE COMPLAINT STATUS
   =============================== */
router.patch(
  "/complaints/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(complaint);
  }
);

export default router;
