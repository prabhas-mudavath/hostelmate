import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= CORS (FINAL, SAFE) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hostelmate-two.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
