import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const allowedOrigins = [
  "http://localhost:5173",
  "https://hostelmate-two.vercel.app",
];
const app = express();

/* ================= CORS (FINAL, SAFE) ================= */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // 🔥 THIS IS THE KEY LINE
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* 🔥 VERY IMPORTANT — handle preflight */
app.options("*", cors());

app.use(express.json());

/* ================= ROUTES ================= */
import dashboardRoutes from "./routes/dashboard.js";
import complaintsRoutes from "./routes/complaints.js";
import noticesRoutes from "./routes/notices.js";
import adminRoutes from "./routes/admin.js";

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/complaints", complaintsRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/admin", adminRoutes);

/* ================= START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
