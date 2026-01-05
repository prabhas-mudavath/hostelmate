import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createService,
  getServices,
  updateServiceStatus
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/", userAuthMiddleware, createService);
router.get("/", userAuthMiddleware, getServices);
router.put(
  "/:id",
  userAuthMiddleware,
  authMiddleware,
  updateServiceStatus
);

export default router;
