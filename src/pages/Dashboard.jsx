import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import {
  Utensils,
  Wrench,
  Bell,
  Shirt,
  AlertCircle,
  CheckCircle,
  Sun,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* ---------------- HOSTEL DATA (REFRESH SAFE) ---------------- */

  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId") || "";

  const hostelName =
    state?.hostelName || localStorage.getItem("hostelName") || "";

  /* ---------------- MOCK STATS ---------------- */
  const [stats, setStats] = useState({
    openComplaints: 0,
    resolvedComplaints: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/dashboard/${hostelId}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [hostelId]);

  /* ---------------- GREETING LOGIC ---------------- */

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{greeting}</h1>
            {/* Emoji replaced with icon */}
            <Sun className="w-5 h-5 text-yellow-500" />
          </div>

          <p className="text-sm text-gray-600 mt-1">
            Welcome to <span className="font-medium">HostelMate</span>
          </p>

          {/* Hostel badge */}
          {hostelName && (
            <div
              className="inline-flex items-center mt-3 px-3 py-1 rounded-full
                         bg-blue-100 text-blue-700 text-xs font-medium"
            >
              {hostelName}
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat
            icon={AlertCircle}
            color="text-red-500"
            value={stats.openComplaints}
            label="Open"
          />
          <Stat
            icon={CheckCircle}
            color="text-green-600"
            value={stats.resolvedComplaints}
            label="Resolved"
          />
          <Stat
            icon={Utensils}
            color="text-blue-600"
            value={stats.todaysMeals}
            label="Meals"
          />
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-2 gap-4">

          <DashboardCard
            title="Mess Menu"
            subtitle="Weekly meals"
            icon={Utensils}
            onClick={() =>
              navigate("/mess", { state: { hostelId } })
            }
          />

          <DashboardCard
            title="Complaints"
            subtitle="Raise & track"
            icon={Wrench}
            onClick={() =>
              navigate("/complaints", { state: { hostelId } })
            }
          />

          <DashboardCard
            title="Notices"
            subtitle="Updates"
            icon={Bell}
            onClick={() =>
              navigate("/notices", { state: { hostelId } })
            }
          />

          <DashboardCard
            title="Laundry"
            subtitle="Services"
            icon={Shirt}
            onClick={() =>
              navigate("/laundry", { state: { hostelId } })
            }
          />
        </div>

      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function Stat({ icon: Icon, color, value, label }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm text-center">
      <Icon className={`w-5 h-5 mx-auto ${color}`} />
      <p className="text-lg font-semibold mt-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

/* ---------- DASHBOARD CARD ---------- */

function DashboardCard({ title, subtitle, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer
                 transition-all hover:shadow-md hover:-translate-y-0.5
                 active:scale-95"
    >
      <Icon className="w-6 h-6 text-blue-600" />
      <h3 className="font-medium mt-3">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
