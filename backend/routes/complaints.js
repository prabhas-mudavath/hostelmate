import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* USER – GET OWN COMPLAINTS */
router.get("/", authMiddleware, async (req, res) => {
  // logic
});

/* USER – ADD COMPLAINT */
router.post("/", authMiddleware, async (req, res) => {
  // logic
});

export default router;
