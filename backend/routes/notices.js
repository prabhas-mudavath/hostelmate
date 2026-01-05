import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

/* ------------------------------------------------
   GET NOTICES BY HOSTEL (PUBLIC – FOR USERS)
------------------------------------------------ */
router.get("/:hostelId", async (req, res) => {
  try {
    const notices = await Notice.find({
      hostelId: req.params.hostelId,
    }).sort({ createdAt: -1 });

    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

/* ------------------------------------------------
   CREATE NOTICE (ADMIN – USED BY admin.js)
   (You already have this working elsewhere)
------------------------------------------------ */
// ❗ DO NOT duplicate admin POST here
// Admin notice creation is already handled in /api/admin/notice

export default router;
