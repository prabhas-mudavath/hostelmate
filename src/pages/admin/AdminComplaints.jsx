import { useState } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

/* ---------- MOCK DATA (ADMIN VIEW) ---------- */
const ALL_COMPLAINTS = [
  {
    id: 1,
    hostel: "SSB Hall",
    title: "Water leakage",
    category: "Plumbing",
    status: "Raised",
    date: "10 Sep 2025",
  },
  {
    id: 2,
    hostel: "CVR Hall",
    title: "Mess food quality",
    category: "Mess",
    status: "In Progress",
    date: "11 Sep 2025",
  },
  {
    id: 3,
    hostel: "KMS Hall",
    title: "Washing machine not working",
    category: "Laundry",
    status: "Resolved",
    date: "09 Sep 2025",
  },
];

/* ---------- COMPONENT ---------- */
export default function AdminComplaints() {
  const [complaints, setComplaints] = useState(ALL_COMPLAINTS);

  const updateStatus = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status:
                c.status === "Raised"
                  ? "In Progress"
                  : c.status === "In Progress"
                  ? "Resolved"
                  : "Resolved",
            }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Admin • Complaints Management
      </h1>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{c.title}</h3>
                <p className="text-sm text-gray-500">
                  {c.category} • {c.hostel}
                </p>
              </div>

              <StatusBadge status={c.status} />
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={14} />
                {c.date}
              </p>

              {c.status !== "Resolved" && (
                <button
                  onClick={() => updateStatus(c.id)}
                  className="text-xs text-blue-600 underline"
                >
                  Update Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STATUS BADGE ---------- */
function StatusBadge({ status }) {
  if (status === "Resolved") {
    return (
      <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full
                       bg-green-100 text-green-700">
        <CheckCircle size={14} /> Resolved
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full
                       bg-yellow-100 text-yellow-700">
        <AlertCircle size={14} /> In Progress
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full
                     bg-red-100 text-red-700">
      <AlertCircle size={14} /> Raised
    </span>
  );
}

