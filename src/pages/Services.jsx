import { toast } from "react-hot-toast";

const services = ["Electrician", "Plumber", "Carpenter", "Housekeeping"];

export default function Services() {
  const requestService = async (serviceType) => {
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceType }),
      });

      if (!res.ok) throw new Error();
      toast.success("Service requested successfully");
    } catch {
      toast.error("Failed to request service");
    }
  };

  return (
    <div className="fade-in min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6">

        <h1 className="text-xl font-semibold mb-4">
          Services
        </h1>

        <div className="grid gap-3">
          {services.map((s) => (
            <button
              key={s}
              onClick={() => requestService(s)}
              className="bg-white rounded-lg p-3 shadow-sm
                         text-left hover:bg-gray-50 active:scale-95 transition-transform duration-150
"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
