import { useEffect, useState } from "react";
import {
  Shirt,
  Wrench,
  Hammer,
  Bike,
  Utensils,
  Clock,
} from "lucide-react";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function MyRequests() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [laundry, setLaundry] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/laundry/my`, {
        headers: { Authorization: token },
      }).then((r) => r.json()),

      fetch(`${API}/api/services/my`, {
        headers: { Authorization: token },
      }).then((r) => r.json()),
    ])
      .then(([laundryData, serviceData]) => {
        setLaundry(laundryData || []);
        setServices(serviceData || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading requests...</p>;
  }

  return (
    <div className="fade-in min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">
        <h1 className="text-xl font-semibold mb-6">
          My Requests
        </h1>

        {/* ================= LAUNDRY ================= */}
        <Section title="Laundry Requests" icon={Shirt}>
          {laundry.length === 0 ? (
            <Empty />
          ) : (
            laundry.map((l) => (
              <StatusCard
                key={l._id}
                icon={Shirt}
                title="Laundry"
                subtitle={`Hostel ${l.hostelId}`}
                status={l.status}
              />
            ))
          )}
        </Section>

        {/* ================= SERVICES ================= */}
        <Section title="Service Requests" icon={Wrench}>
          {services.length === 0 ? (
            <Empty />
          ) : (
            services.map((s) => (
              <StatusCard
                key={s._id}
                icon={getServiceIcon(s.serviceType)}
                title={s.serviceType}
                subtitle={`Hostel ${s.hostelId}`}
                status={s.status}
              />
            ))
          )}
        </Section>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Section({ title, icon: Icon, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-blue-600" />
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function StatusCard({ icon: Icon, title, subtitle, status }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border flex justify-between">
      <div className="flex items-center gap-3">
        <Icon className="text-blue-600" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <span
        className={`px-2 py-1 text-xs rounded-full ${STATUS_COLORS[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

function Empty() {
  return (
    <div className="text-sm text-gray-500 flex items-center gap-2">
      <Clock size={14} />
      No requests yet
    </div>
  );
}

/* ---------- ICON MAP ---------- */

function getServiceIcon(type) {
  switch (type) {
    case "Electrician":
    case "Plumber":
      return Wrench;
    case "Carpenter":
    case "Cobbler":
      return Hammer;
    case "Cycle Stand":
      return Bike;
    case "Mess Caterer":
      return Utensils;
    default:
      return Wrench;
  }
}
