import { useState } from "react";
import { MESS_MENUS } from "../../data/messMenus";

const HOSTELS = Object.keys(MESS_MENUS);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Snacks", "Dinner"];

export default function AdminMess() {
  const [hostel, setHostel] = useState(HOSTELS[0]);
  const [day, setDay] = useState("Mon");

  // IMPORTANT: deep copy for editing
  const [menus, setMenus] = useState(
    JSON.parse(JSON.stringify(MESS_MENUS))
  );

  const mealData = menus[hostel]?.[day] || {};

  const handleChange = (meal, value) => {
    setMenus((prev) => ({
      ...prev,
      [hostel]: {
        ...prev[hostel],
        [day]: {
          ...prev[hostel]?.[day],
          [meal]: {
            time: prev[hostel]?.[day]?.[meal]?.time || "Custom",
            items: value.split(",").map((i) => i.trim()),
          },
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Admin • Mess Menu Editor
      </h1>

      {/* HOSTEL SELECT */}
      <div className="flex gap-3 mb-6">
        <select
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {HOSTELS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* MEAL EDITORS */}
      <div className="space-y-5">
        {MEALS.map((meal) => (
          <div key={meal} className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium mb-2">{meal}</h3>

            <textarea
              rows={2}
              value={mealData[meal]?.items?.join(", ") || ""}
              onChange={(e) => handleChange(meal, e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter items separated by commas"
            />

            <p className="text-xs text-gray-500 mt-1">
              Example: Rice, Dal, Paneer Curry
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => console.log("UPDATED MENU:", menus)}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}