import Laundry from "../models/Laundry.js";

/* USER → CREATE */
export const createLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.create({
      userId: req.user.id,
      room: req.body.room,
      laundryType: req.body.laundryType,
      clothesCount: req.body.clothesCount
    });

    res.json(laundry);
  } catch {
    res.status(500).json({ message: "Failed to create laundry request" });
  }
};

/* ADMIN / USER → READ */
export const getLaundry = async (req, res) => {
  const filter =
    req.user.role === "admin" ? {} : { userId: req.user.id };

  const data = await Laundry.find(filter).sort({ createdAt: -1 });
  res.json(data);
};

/* ADMIN → UPDATE */
export const updateLaundryStatus = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  await Laundry.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Laundry status updated" });
};
