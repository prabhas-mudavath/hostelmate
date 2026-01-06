import { toast } from "react-hot-toast";
import { Phone, Wrench } from "lucide-react";

const REQUEST_SERVICES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Housekeeping",
];

const DIRECTORY_SERVICES = [
  { name: "Cobbler", contact: "9876543210" },
  { name: "Cycle Stand", contact: "9123456780" },
  { name: "Mess Caterer", contact: "9988776655" },
];

export default function Services() {
  const requestService = async (serviceType) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/services`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceType }),
        }
      );

      if (!res.ok) throw new Error();
      toast.success(`${serviceType} requested`);
    } catch {
      toast.error("Failed to request service");
    }
  };

  return (
    <div className="fade-in min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* REQUEST SERVICES */}
        <h1 className="text-xl font-semibold mb-4">Request a Service</h1>
        <div className="grid gap-3 mb-8">
          {REQUEST_SERVICES.map((s) => (
            <button
              key={s}
              onClick={() => requestService(s)}
              className="bg-white rounded-lg p-3 shadow-sm text-left
                         hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Wrench className="inline mr-2 text-blue-600" />
              {s}
            </button>
          ))}
        </div>

        {/* SERVICE DIRECTORY */}
        <h2 className="text-lg font-semibold mb-3">Service Directory</h2>
        <div className="space-y-3">
          {DIRECTORY_SERVICES.map((s) => (
            <div
              key={s.name}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Phone size={14} /> {s.contact}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
