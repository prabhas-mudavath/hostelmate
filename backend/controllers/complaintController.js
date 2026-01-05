import Complaint from "../models/Complaints.js";

// ADD complaint
export const addComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();

    res.status(201).json({
      message: "Complaint added successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add complaint",
      error
    });
  }
};

// GET all complaints
// GET complaints with filters
export const getComplaints = async (req, res) => {
  try {
    const { hostelId, status, category } = req.query;

    let filter = {};

    if (hostelId) filter.hostelId = hostelId;
    if (status) filter.status = status;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error
    });
  }
};


// DELETE complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete complaint",
      error
    });
  }
};
// UPDATE complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      message: "Complaint status updated successfully ✅",
      updatedComplaint
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status ❌",
      error
    });
  }
};
