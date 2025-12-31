import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Shirt,
  Clock,
  IndianRupee,
  Phone,
  Sparkles,
  Wrench,
  Droplets,
} from "lucide-react";

/* ---------- PRIVATE SHED (COMMON) ---------- */

const PRIVATE_LAUNDRY = {
  name: "Private Laundry Service",
  services: ["Dry Wash", "Normal Wash"],
  note: "Charges decided by vendor. Optional service for all hostels.",
  contact: "+91 9XXXXXXXXX",
};

/* ---------- COMPONENT ---------- */

export default function Laundry() {
  const { state } = useLocation();
  const hostelId = state?.hostelId;

  const [loadingLaundry, setLoadingLaundry] = useState(false);
  const [loadingService, setLoadingService] = useState(false);

  const isCVR = hostelId === "CVR";

  /* ---------- BACKEND CALLS ---------- */

  const requestLaundry = async () => {
    if (loadingLaundry) return;

    setLoadingLaundry(true);
    try {
      const res = await fetch("http://localhost:5000/api/laundry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          room: hostelId,
          laundryType: "Hostel Laundry",
          clothesCount: 1,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Laundry request submitted");
    } catch {
      toast.error("Failed to submit laundry request");
    } finally {
      setLoadingLaundry(false);
    }
  };

  const requestService = async (serviceType) => {
    if (loadingService) return;

    setLoadingService(true);
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ serviceType }),
      });

      if (!res.ok) throw new Error();
      toast.success(`${serviceType} service requested`);
    } catch {
      toast.error("Service request failed");
    } finally {
      setLoadingService(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* Header */}
        <h1 className="text-xl font-semibold mb-1">Laundry & Services</h1>
        <p className="text-xs text-gray-500 mb-5">
          {hostelId} • Hostel laundry details
        </p>

        {/* HOSTEL LAUNDRY */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Shirt className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-medium">Hostel Laundry Facility</h2>
          </div>

          {isCVR ? (
            <>
              <p className="text-sm text-gray-600 mb-3">
                A laundry attendant is available to operate the washing machines.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <IndianRupee size={16} />
                ₹10 per bucket
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} />
                6:00 AM – 9:00 AM & 5:00 PM – 8:00 PM
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-3">
                Washing machines are available for self-use.
                No staff is assigned for operation.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <IndianRupee size={16} />
                Free of cost
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} />
                Available anytime
              </div>
            </>
          )}

          <button
            onClick={requestLaundry}
            disabled={loadingLaundry}
            className={`mt-4 w-full py-2 rounded-lg text-sm text-white
              ${loadingLaundry ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"}`}
          >
            {loadingLaundry ? "Submitting..." : "Request Laundry"}
          </button>
        </div>

        {/* PRIVATE LAUNDRY */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h2 className="font-medium mb-2">{PRIVATE_LAUNDRY.name}</h2>
          <p className="text-sm text-gray-600 mb-3">{PRIVATE_LAUNDRY.note}</p>

          <ul className="list-disc pl-5 text-sm text-gray-700 mb-3">
            {PRIVATE_LAUNDRY.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Phone size={16} />
            {PRIVATE_LAUNDRY.contact}
          </div>
        </div>

        {/* OTHER SERVICES */}
        <div>
          <h2 className="text-lg font-medium mb-3">Other Services</h2>
          <div className="grid grid-cols-2 gap-4">
            <ServiceCard
              icon={Sparkles}
              title="Room Cleaning"
              desc="Request room cleaning service"
              onClick={() => requestService("Room Cleaning")}
            />
            <ServiceCard
              icon={Wrench}
              title="Electrician"
              desc="Fan, light, switch issues"
              onClick={() => requestService("Electrician")}
            />
            <ServiceCard
              icon={Droplets}
              title="Plumber"
              desc="Water leakage, drainage"
              onClick={() => requestService("Plumber")}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------- SERVICE CARD ---------- */

function ServiceCard({ icon: Icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer
                 transition-all hover:shadow-md hover:-translate-y-0.5
                 active:scale-95"
    >
      <Icon className="w-5 h-5 text-blue-600 mb-2" />
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
