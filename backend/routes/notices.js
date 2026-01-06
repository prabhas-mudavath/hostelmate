import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Notice from "../models/Notice.js";

const router = express.Router();

/* ===============================
   GET NOTICES (USER + ADMIN)
   =============================== */
router.get("/", async (req, res) => {
  try {
    const { hostelId } = req.query;

    const filter = hostelId ? { hostelId } : {};
    const notices = await Notice.find(filter).sort({ createdAt: -1 });

    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

/* ===============================
   CREATE NOTICE (ADMIN ONLY)
   =============================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { hostelId, title, description, priority } = req.body;

    const notice = await Notice.create({
      hostelId,
      title,
      description,
      priority,
    });

    res.status(201).json({
      message: "Notice added successfully",
      notice,
    });
  } catch (err) {
    console.error("ADMIN NOTICE ERROR:", err);
    res.status(500).json({ message: "Failed to add notice" });
  }
});

export default router;
