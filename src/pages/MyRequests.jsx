import { useEffect, useState } from "react";

export default function MyRequests() {
  const [laundry, setLaundry] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/laundry", {
      headers: { Authorization: localStorage.getItem("token") },
    }).then(r => r.json()).then(setLaundry);

    fetch("http://localhost:5000/api/services", {
      headers: { Authorization: localStorage.getItem("token") },
    }).then(r => r.json()).then(setServices);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="font-semibold">My Laundry Requests</h2>
      {laundry.map(l => (
        <StatusCard
          key={l._id}
          title="Laundry"
          status={l.status}
        />
      ))}

      <h2 className="font-semibold mt-6">My Service Requests</h2>
      {services.map(s => (
        <StatusCard
          key={s._id}
          title={s.serviceType}
          status={s.status}
        />
      ))}
    </div>
  );
}

function StatusCard({ title, status }) {
  const color =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="border rounded-lg p-3 flex justify-between">
      <span>{title}</span>
      <span className={`px-2 py-0.5 rounded text-xs ${color}`}>
        {status}
      </span>
    </div>
  );
}
