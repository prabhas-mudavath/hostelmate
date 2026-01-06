import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import ServiceDirectory from "../models/ServiceDirectory.js";

const router = express.Router();

/* GET SERVICES */
router.get("/", async (req, res) => {
  const { hostelId } = req.query;
  const data = await ServiceDirectory.find({ hostelId });
  res.json(data);
});

/* ADMIN ADD SERVICE */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const service = await ServiceDirectory.create(req.body);
    res.status(201).json(service);
  }
);

export default router;
