import { useEffect, useState } from "react";
import { TickIcon, CrossIcon } from "../../components/StatusIcon";

function AdminServices() {
  const [data, setData] = useState([]);

  const fetchServices = async () => {
    const res = await fetch("http://localhost:5000/api/services", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    setData(await res.json());
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ status })
    });
    fetchServices();
  };

  return (
    <div className="space-y-2">
      {data.map((s) => (
        <div key={s._id} className="border p-3 flex justify-between">
          <span>{s.serviceType} — {s.status}</span>
          <div className="flex gap-2">
            <button onClick={() => updateStatus(s._id, "Completed")}>
              <TickIcon />
            </button>
            <button onClick={() => updateStatus(s._id, "Rejected")}>
              <CrossIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminServices;
