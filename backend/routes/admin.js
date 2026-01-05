import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

/* -------- ADMIN ADD NOTICE -------- */
router.post("/notice", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔍 DEBUG

    const notice = new Notice(req.body);
    await notice.save();

    res.status(201).json({
      message: "Notice added successfully",
      notice,
    });
  } catch (err) {
    console.error("ADMIN NOTICE ERROR:", err); // 🔴 REAL ERROR
    res.status(500).json({
      message: "Failed to add notice",
      error: err.message,
    });
  }
});

export default router;
