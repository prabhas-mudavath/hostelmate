import ServiceRequest from "../models/ServiceRequest.js";

/* CREATE SERVICE REQUEST */
export const createService = async (req, res) => {
  try {
    const service = await ServiceRequest.create({
      userId: req.user.id,
      serviceType: req.body.serviceType,
      status: "Pending"
    });

    res.json(service);
  } catch {
    res.status(500).json({ message: "Failed to create service request" });
  }
};

/* GET SERVICES (ADMIN / USER) */
export const getServices = async (req, res) => {
  const filter =
    req.user.role === "admin" ? {} : { userId: req.user.id };

  const data = await ServiceRequest.find(filter).sort({ createdAt: -1 });
  res.json(data);
};

/* UPDATE STATUS (ADMIN ONLY) */
export const updateServiceStatus = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  await ServiceRequest.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Service status updated" });
};
