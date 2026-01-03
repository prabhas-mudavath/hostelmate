import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const token = localStorage.getItem("token");

        const [laundry, services] = await Promise.all([
          fetch("http://localhost:5000/api/laundry", {
            headers: { Authorization: token },
          }).then((r) => r.json()),

          fetch("http://localhost:5000/api/services", {
            headers: { Authorization: token },
          }).then((r) => r.json()),
        ]);

        const count =
          laundry.filter((l) => l.status === "Pending").length +
          services.filter((s) => s.status === "Pending").length;

        setPendingCount(count);
      } catch (err) {
        console.error("Failed to fetch pending count");
      }
    };

    fetchPendingCount();
  }, []);

  return (
    <div className="flex">
      {/* PASS COUNT TO SIDEBAR */}
      <AdminSidebar pendingCount={pendingCount} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {/* rest of dashboard content */}
      </div>
    </div>
  );
}
