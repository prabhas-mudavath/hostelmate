import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, CheckCircle } from "lucide-react";

const STATUS_STEPS = ["Raised", "In Progress", "Resolved"];

export default function Complaints() {
  const { state } = useLocation();
  const hostelId = state?.hostelId || "SSB";

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  //  FETCH FROM BACKEND
  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/${hostelId}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [hostelId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading complaints...</p>;
  }

  if (complaints.length === 0) {
    return (
      <p className="p-6 text-gray-500">
        No complaints for this hostel
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        <h1 className="text-xl font-semibold mb-5">
          Complaints ({hostelId})
        </h1>

        {complaints.map((c) => {
          const currentStep = STATUS_STEPS.indexOf(c.status);

          return (
            <div
              key={c._id}
              className="bg-white rounded-2xl p-4 shadow-sm mb-4"
            >
              {/* Title */}
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.category}</p>

              {/* Timeline */}
              <div className="flex items-center justify-between mt-4">
                {STATUS_STEPS.map((step, index) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
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

              {/* Date */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
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