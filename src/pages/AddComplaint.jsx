import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

const STATUS_STEPS = ["Raised", "In Progress", "Resolved"];

export default function AdminComplaints() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COMPLAINTS ================= */
  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${API}/api/admin/complaints`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/admin/complaints/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });

    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="text-blue-600" />
        <h1 className="text-2xl font-semibold">Admin Complaints</h1>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found</p>
      ) : (
        <div className="space-y-6">
          {complaints.map((c) => {
            const currentStep = STATUS_STEPS.indexOf(c.status);

            return (
              <div
                key={c._id}
                className="bg-white p-5 rounded-xl shadow-sm border"
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{c.title}</h3>
                    <p className="text-sm text-gray-500">
                      {c.category} • Hostel {c.hostelId}
                    </p>
                  </div>

                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(c._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {STATUS_STEPS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-3">
                  {c.description}
                </p>

                {/* TIMELINE */}
                <div className="flex items-center mt-5">
                  {STATUS_STEPS.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center flex-1"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                          ${
                            index <= currentStep
                              ? "bg-blue-600 text-white"
                              : "bg-gray-300 text-gray-600"
                          } transition-all duration-300`}
                      >
                        {index + 1}
                      </div>

                      {index < STATUS_STEPS.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded
                            ${
                              index < currentStep
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            } transition-all duration-300`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* LABELS */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {STATUS_STEPS.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
