import { useState } from "react";
import { useLocation } from "react-router-dom";
import { exportWeeklyMenu } from "../utils/exportMenuPDF";
import { HOSTEL_MESS_MAP } from "../data/hostelMessMap";
import { MESS_MENUS } from "../data/messMenus";


import {
  Utensils,
  Sun,
  Sandwich,
  Coffee,
  Moon,
  AlarmClock,
  Download,
  XCircle,
} from "lucide-react";

/* ---------- ICON MAP ---------- */
const MEAL_ICONS = {
  Breakfast: Sun,
  Lunch: Sandwich,
  Snacks: Coffee,
  Dinner: Moon,
};

export default function MessMenu() {
  const { state } = useLocation();
  const hostelId =
    state?.hostelId || localStorage.getItem("hostelId");

  /* ---------- MAP HOSTEL → MESS GROUP ---------- */
  const messKey = HOSTEL_MESS_MAP[hostelId];
  const MENU = MESS_MENUS[messKey];

  /* ---------- SAFETY CHECK ---------- */
  if (!MENU) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <CrossIcon /> Menu not available for this hostel: {hostelId}
      </div>
    );
  }

  const days = Object.keys(MENU);
  const [day, setDay] = useState(days[0]);

  return (
    <div className="fade-in min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6 pb-10">

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Mess Menu</h1>
              <p className="text-xs text-gray-400 ">
                {hostelId} • Weekly Schedule
              </p>
            </div>
          </div>

          <button
            onClick={() => exportWeeklyMenu(MENU)}
            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg
                       bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>

        {/* DAY SELECTOR */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium  active:scale-95 transition-transform duration-150

                ${day === d
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border"
                }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* MEAL CARDS */}
        <div className="mt-6 space-y-4">
          {Object.entries(MENU[day]).map(([meal, data]) => {
            const Icon = MEAL_ICONS[meal];

            return (
              <div
                key={meal}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100
                           hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">{meal}</h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs
                                  bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    <AlarmClock className="w-4 h-4" />
                    {data.time}
                  </div>
                </div>

                {/* ITEMS */}
                <ul className="mt-4 text-sm text-gray-700 list-disc pl-5 space-y-2">
                  {data.items.map((item, idx) => {
                    const text = item.toLowerCase();
                    const isLunchOrDinner =
                      meal === "Lunch" || meal === "Dinner";

                    const hasNonVegCurry = data.items.some((i) =>
                      ["chicken", "mutton", "fish"].some((nv) =>
                        i.toLowerCase().includes(nv)
                      )
                    );

                    const isNonVeg =
                      isLunchOrDinner &&
                      ["chicken", "mutton", "fish"].some((nv) =>
                        text.includes(nv)
                      );

                    const isVegSubstitute =
                      isLunchOrDinner &&
                      hasNonVegCurry &&
                      ["paneer", "mushroom", "soyabean"].some((veg) =>
                        text.includes(veg)
                      );

                    return (
                      <li key={idx} className="flex items-start gap-2">
                        <span>{item}</span>

                        {isNonVeg && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full
                                           bg-red-50 text-red-600 border border-red-200">
                            Non-Veg
                          </span>
                        )}

                        {isVegSubstitute && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full
                                           bg-green-50 text-green-600 border border-green-200">
                            Veg
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}