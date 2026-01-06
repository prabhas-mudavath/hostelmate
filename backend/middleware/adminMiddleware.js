export default function adminMiddleware(req, res, next) {
  if (req.user.role !== "warden" && req.user.role !== "chief") {
    return res.status(403).json({ message: "Admin access denied" });
  }
  next();
}
