import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createLaundry,
  getLaundry,
  updateLaundryStatus
} from "../controllers/laundryController.js";

const router = express.Router();

/* USER → CREATE */
router.post("/", userAuthMiddleware, createLaundry);

/* USER / ADMIN → READ */
router.get("/", userAuthMiddleware, getLaundry);

/* ADMIN → UPDATE */
router.put(
  "/:id",
  userAuthMiddleware,
  authMiddleware,
  updateLaundryStatus
);

export default router;
