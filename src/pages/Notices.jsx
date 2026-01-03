import { useLocation } from "react-router-dom";
import { Bell, Calendar } from "lucide-react";
import { NOTICES_DATA } from "../data/noticesData";

export default function Notices() {
  const { state } = useLocation();

  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId");

  const notices = NOTICES_DATA[hostelId] || [];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* Header */}
        <h1 className="text-xl font-semibold">Notices</h1>
        <p className="text-xs text-gray-500 mt-1">
          Hostel • {hostelId}
        </p>

        <div className="mt-6 space-y-4">
          {notices.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-10">
              No notices available
            </p>
          )}

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">{notice.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notice.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full h-fit
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

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Calendar size={14} />
                {notice.date}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
