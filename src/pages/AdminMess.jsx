import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminMess() {
  const [day, setDay] = useState("Mon");
  const [nonVeg, setNonVeg] = useState("none");
  const [iceCream, setIceCream] = useState("none");

  const handleSave = () => {
    const data = {
      day,
      nonVeg,
      iceCream,
    };

    console.log("Saved Menu Rule:", data);
    alert("Menu rule saved (check console)");
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md px-4 pt-6">

        <h1 className="text-xl font-semibold">
          Admin – Mess Menu
        </h1>

        <p className="text-sm text-textSecondary mt-1">
          Edit daily menu rules
        </p>

        {/* Day Selector */}
        <div className="mt-6">
          <label className="text-sm font-medium">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-card border border-border"
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Non-Veg */}
        <div className="mt-4">
          <label className="text-sm font-medium">Non-Veg Item</label>
          <select
            value={nonVeg}
            onChange={(e) => setNonVeg(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-card border border-border"
          >
            <option value="none">None</option>
            <option value="mutton">Mutton</option>
            <option value="fish">Fish</option>
            <option value="chicken">Chicken</option>
          </select>
        </div>

        {/* Ice Cream */}
        <div className="mt-4">
          <label className="text-sm font-medium">Ice-cream Rule</label>
          <select
            value={iceCream}
            onChange={(e) => setIceCream(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-card border border-border"
          >
            <option value="none">None</option>
            <option value="veg-only">Veg students only</option>
            <option value="all-afternoon">All students (afternoon)</option>
          </select>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-3 rounded-xl bg-primary text-white font-medium"
        >
          Save Rule
        </button>

      </div>
    </div>
  );
}
