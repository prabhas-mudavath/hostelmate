import { useEffect, useState } from "react";
import {
  Shirt,
  Wrench,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function MyRequests() {
  const [laundry, setLaundry] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/laundry", {
        headers: { Authorization: localStorage.getItem("token") },
      }).then((r) => r.json()),

      fetch("http://localhost:5000/api/services", {
        headers: { Authorization: localStorage.getItem("token") },
      }).then((r) => r.json()),
    ])
      .then(([laundryData, serviceData]) => {
        setLaundry(laundryData || []);
        setServices(serviceData || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your requests…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-semibold">My Requests</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track your laundry & service requests
          </p>
        </div>

        {/* LAUNDRY */}
        <Section
          title="Laundry Requests"
          icon={Shirt}
          emptyText="No laundry requests yet"
          items={laundry}
          render={(l) => (
            <StatusCard
              key={l._id}
              title="Hostel Laundry"
              status={l.status}
            />
          )}
        />

        {/* SERVICES */}
        <Section
          title="Service Requests"
          icon={Wrench}
          emptyText="No service requests yet"
          items={services}
          render={(s) => (
            <StatusCard
              key={s._id}
              title={s.serviceType}
              status={s.status}
            />
          )}
        />

      </div>
    </div>
  );
}

/* ---------- SECTION ---------- */

function Section({ title, icon: Icon, items, render, emptyText }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <h2 className="font-medium">{title}</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center mt-6">
          {emptyText}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map(render)}
        </div>
      )}
    </div>
  );
}

/* ---------- STATUS CARD ---------- */

function StatusCard({ title, status }) {
  const statusMap = {
    Completed: {
      bg: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    Rejected: {
      bg: "bg-red-100 text-red-700",
      icon: XCircle,
    },
    Pending: {
      bg: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    "In Progress": {
      bg: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
  };

  const { bg, icon: Icon } =
    statusMap[status] || statusMap.Pending;

  return (
    <div
      className="bg-white rounded-xl p-3 shadow-sm flex justify-between items-center
                 transition hover:shadow-md"
    >
      <span className="text-sm font-medium">{title}</span>

      <span
        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${bg}`}
      >
        <Icon size={14} />
        {status}
      </span>
    </div>
  );
}
