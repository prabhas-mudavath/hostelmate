import { toast } from "react-hot-toast";
import { Wrench, Droplets, Hammer, Sparkles } from "lucide-react";

const services = [
  { name: "Electrician", icon: Wrench },
  { name: "Plumber", icon: Droplets },
  { name: "Carpenter", icon: Hammer },
  { name: "Housekeeping", icon: Sparkles },
];

function Services() {
  const requestService = async (serviceType) => {
    try {
      toast.success(`${serviceType} requested`);
    } catch {
      toast.error("Failed to request service");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        <h1 className="text-xl font-semibold mb-4">Services</h1>

        <div className="grid grid-cols-2 gap-4">
          {services.map(({ name, icon: Icon }) => (
            <div
              key={name}
              onClick={() => requestService(name)}
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer
                         transition-all hover:shadow-md hover:-translate-y-0.5
                         active:scale-95"
            >
              <Icon className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Services;
