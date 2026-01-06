import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Calendar } from "lucide-react";

export default function Notices() {
  const { state } = useLocation();

  // ✅ hostelId from navigation OR localStorage (refresh-safe)
  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH NOTICES ---------------- */
  useEffect(() => {
    if (!hostelId) {
      setError("Hostel not selected");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/notices/${hostelId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load notices");
        setLoading(false);
      });
  }, [hostelId]);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="fade-in min-h-screen flex items-center justify-center text-gray-500">
        Loading notices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="fade-in min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* Header */}
        <h1 className="text-xl font-semibold">Notices</h1>
        <p className="text-xs text-gray-500 mt-1">
          {hostelId} • Hostel announcements
        </p>

        {/* Notices List */}
        <div className="mt-6 space-y-4">

          {notices.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-10">
              No notices for this hostel
            </p>
          )}

          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">

                {/* Left */}
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notice.description}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <span
                  className={`text-xs px-2 py-1 rounded-full
                    ${
                      notice.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : notice.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {notice.priority}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Calendar size={14} />
                {new Date(notice.createdAt).toDateString()}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
