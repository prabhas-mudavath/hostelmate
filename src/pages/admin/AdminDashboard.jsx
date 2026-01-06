import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Shirt, Wrench } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/api/admin/dashboard`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card icon={AlertCircle} label="Open Complaints" value={stats.openComplaints} />
        <Card icon={CheckCircle} label="Resolved" value={stats.resolvedComplaints} />
        <Card icon={Shirt} label="Laundry Requests" value={stats.laundryPending} />
        <Card icon={Wrench} label="Service Requests" value={stats.servicePending} />
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <Icon className="text-blue-600 mb-2" />
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
