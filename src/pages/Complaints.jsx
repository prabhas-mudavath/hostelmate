import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

const STATUS_STEPS = ["Raised", "In Progress", "Resolved"];

export default function Complaints() {
  const { state } = useLocation();

  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId") || "SSB";

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/${hostelId}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hostelId]);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading complaints…
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No complaints raised yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold">Complaints</h1>
          <p className="text-xs text-gray-500 mt-1">
            Hostel • {hostelId}
          </p>
        </div>

        {complaints.map((c) => {
          const currentStep = STATUS_STEPS.indexOf(c.status);

          return (
            <div
              key={c._id}
              className="bg-white rounded-2xl p-4 shadow-sm mb-4
                         transition-all hover:shadow-md"
            >
              {/* Title */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.category}</p>
                </div>
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between mt-4">
                {STATUS_STEPS.map((step, index) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs
                        ${
                          index <= currentStep
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
                          ${
                            index < currentStep
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Clock size={14} />
                {c.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
