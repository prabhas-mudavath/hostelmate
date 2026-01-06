import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

/* GET NOTICES (PUBLIC / USER) */
router.get("/", async (req, res) => {
  try {
    const { hostelId } = req.query;
    const filter = hostelId ? { hostelId } : {};
    const notices = await Notice.find(filter).sort({ createdAt: -1 });
    res.json(notices);
  } catch {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

export default router;
