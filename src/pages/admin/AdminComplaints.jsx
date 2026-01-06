import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

const STATUS = ["Raised", "In Progress", "Resolved"];

export default function AdminComplaints() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/admin/complaints`, {
      headers: { Authorization: token },
    })
      .then((r) => r.json())
      .then(setComplaints);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/admin/complaints/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });
    setComplaints((c) =>
      c.map((x) => (x._id === id ? { ...x, status } : x))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 fade-in">
      <h1 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Wrench className="text-blue-600" /> Admin Complaints
      </h1>

      {complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-xl mb-4 shadow-sm">
            <h3 className="font-medium">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>

            <select
              value={c.status}
              onChange={(e) => updateStatus(c._id, e.target.value)}
              className="mt-3 border rounded px-2 py-1 text-sm"
            >
              {STATUS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
}
