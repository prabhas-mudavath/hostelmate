import { useEffect, useState } from "react";
import { Bell, PlusCircle } from "lucide-react";

export default function AdminNotices() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    hostelId: "",
    title: "",
    description: "",
    priority: "Medium",
  });

  /* ================= FETCH NOTICES ================= */
  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API}/api/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  /* ================= ADD NOTICE ================= */
  const addNotice = async () => {
    if (!form.hostelId || !form.title || !form.description) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch(`${API}/api/admin/notice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        hostelId: "",
        title: "",
        description: "",
        priority: "Medium",
      });
      fetchNotices();
    } else {
      alert("Failed to add notice");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-blue-600" />
        <h1 className="text-2xl font-semibold">Admin Notices</h1>
      </div>

      {/* ADD NOTICE */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-8">
        <h2 className="font-medium mb-4 flex items-center gap-2">
          <PlusCircle size={18} />
          Add New Notice
        </h2>

        <div className="grid gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Hostel ID (SSB / CVR / ALL)"
            value={form.hostelId}
            onChange={(e) =>
              setForm({ ...form, hostelId: e.target.value })
            }
          />

          <input
            className="border rounded px-3 py-2"
            placeholder="Notice title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="border rounded px-3 py-2"
            placeholder="Notice description"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="border rounded px-3 py-2"
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={addNotice}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Publish Notice
          </button>
        </div>
      </div>

      {/* NOTICE LIST */}
      {loading ? (
        <p className="text-gray-500">Loading notices...</p>
      ) : notices.length === 0 ? (
        <p className="text-gray-500">No notices found</p>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n._id}
              className="bg-white p-4 rounded-xl shadow-sm border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{n.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {n.description}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full
                    ${
                      n.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : n.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {n.priority}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Hostel: {n.hostelId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
