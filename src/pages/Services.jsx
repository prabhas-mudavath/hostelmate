import { toast } from "react-hot-toast";

const services = ["Electrician", "Plumber", "Carpenter", "Housekeeping"];

function Services() {
  const requestService = async (serviceType) => {
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ serviceType })
      });

      if (!res.ok) throw new Error();

      toast.success("Service requested");
    } catch {
      toast.error("Failed to request service");
    }
  };

  return (
    <div className="grid gap-3 max-w-md">
      {services.map((s) => (
        <button
          key={s}
          onClick={() => requestService(s)}
          className="border p-3 rounded hover:bg-gray-100"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export default Services;
