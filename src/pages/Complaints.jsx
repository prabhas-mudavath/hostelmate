import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock, CheckCircle, Plus } from "lucide-react";

const STATUS_STEPS = ["Raised", "In Progress", "Resolved"];

export default function Complaints() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ refresh-safe hostelId
  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH COMPLAINTS ---------------- */
  useEffect(() => {
    const hostelId =
      state?.hostelId || localStorage.getItem("hostelId");

    fetch(
      `https://hostelmate-backend.onrender.com/api/complaints/${hostelId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [state]);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading complaints...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-semibold">Complaints</h1>
            <p className="text-xs text-gray-500 mt-1">
              {hostelId} • Track your issues
            </p>
          </div>

          {/* Add Complaint */}
          <button
            onClick={() => navigate("/add-complaint")}
            className="bg-blue-600 text-white p-2 rounded-full
                       active:scale-95"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Empty State */}
        {complaints.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No complaints raised yet
          </p>
        )}

        {/* Complaint Cards */}
        {complaints.map((c) => {
          const currentStep = STATUS_STEPS.indexOf(c.status);

          return (
            <div
              key={c._id}
              className="bg-white rounded-2xl p-4 shadow-sm mb-4"
            >
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.category}</p>

              {/* Status Timeline */}
              <div className="flex items-center justify-between mt-4">
                {STATUS_STEPS.map((step, index) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center
                        justify-center text-xs
                        ${index <= currentStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-400"
                        }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle size={14} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1
                          ${index < currentStep
                            ? "bg-blue-600"
                            : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock size={14} />
                {new Date(c.createdAt).toDateString()}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
