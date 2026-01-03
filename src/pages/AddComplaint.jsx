import { useNavigate } from "react-router-dom";
import {
  Send,
  Wrench,
  MapPin,
  MessageSquare,
} from "lucide-react";

export default function AddComplaint() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Raise Complaint</h1>
          <p className="text-sm text-textSecondary mt-1">
            Report an issue in your hostel
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-5">

          {/* ISSUE TYPE */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              Issue Type
            </label>

            <select
              className="w-full mt-2 px-4 py-3 rounded-lg bg-background
                         border border-border text-sm outline-none
                         focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Select issue type</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Carpentry</option>
              <option>Cleaning</option>
              <option>Other</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </label>

            <input
              placeholder="Room number & hostel"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-background
                         border border-border text-sm outline-none
                         focus:ring-2 focus:ring-primary/30"
            />

            <p className="text-xs text-textSecondary mt-1">
              Example: Room 214, SSB Hall
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Describe the issue clearly"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-background
                         border border-border text-sm outline-none resize-none
                         focus:ring-2 focus:ring-primary/30"
            />
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-6 py-3 rounded-xl
                     bg-primary text-white font-medium
                     transition-all duration-200
                     active:scale-95 hover:opacity-95
                     flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Complaint
        </button>

      </div>
    </div>
  );
}
