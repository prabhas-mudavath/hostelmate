import { useEffect, useState } from "react";
import { Wrench, CheckCircle } from "lucide-react";

const STATUS = ["Pending", "In Progress", "Completed", "Rejected"];

export default function AdminServices() {
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const res = await fetch(`${API}/api/admin/services`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/admin/services/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });
    fetchServices();
  };

  if (loading) return <p className="p-6">Loading services…</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Wrench className="text-blue-600" />
        Service Management
      </h1>

      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{s.serviceType}</h3>
                <p className="text-sm text-gray-500">
                  Hostel {s.hostelId}
                </p>
              </div>

              <select
                value={s.status}
                onChange={(e) =>
                  updateStatus(s._id, e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                {STATUS.map((st) => (
                  <option key={st}>{st}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Requested by: {s.userName || "Student"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
