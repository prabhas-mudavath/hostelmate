import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ---------------- DATA ---------------- */

const boysHostels = [
  { id: "SSB", name: "Shanti Swarup Bhatnagar Hall of Residence", short: "SSB Hall" },
  { id: "MV", name: "M. Visvesvaraya Hall of Residence", short: "MV Hall" },
  { id: "GDB", name: "G. D. Birla Hall of Residence", short: "GDB Hall" },
  { id: "DBA", name: "Dhirubhai Ambani Hall of Residence", short: "DBA Hall" },
  { id: "MSS", name: "M. S. Swaminathan Hall of Residence", short: "MSS Hall" },
  { id: "SD", name: "Satish Dhawan Hall of Residence", short: "SD Hall" },
  { id: "VS", name: "Vikram Sarabhai Hall of Residence", short: "VS Hall" },
  { id: "VK", name: "Verghese Kurien Hall of Residence", short: "VK Hall" },
];

const girlsHostels = [
  { id: "HB", name: "Homi Bhabha Hall of Residence", short: "HB Hall" },
  { id: "CVR", name: "C. V. Raman Hall of Residence", short: "CVR Hall" },
  { id: "KMS", name: "Kiran Majumdar Shaw Hall of Residence", short: "KMS Hall" },
  { id: "VK", name: "Verghese Kurien Hall of Residence", short: "VK Hall" },
  { id: "SSB", name: "Shanti Swarup Bhatnagar Hall of Residence", short: "SSB Hall" },
];

/* ---------------- COMPONENT ---------------- */

export default function HostelSelect() {
  const [activeTab, setActiveTab] = useState("boys");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const hostelList = activeTab === "boys" ? boysHostels : girlsHostels;

  const filteredHostels = hostelList.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.short.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md px-4 pt-10 pb-10">

        <h1 className="text-2xl font-semibold text-center">HostelMate</h1>
        <p className="text-textSecondary text-center mt-1">
          Select your hostel to continue
        </p>

        {/* Tabs */}
        <div className="mt-6 flex bg-border rounded-lg p-1">
          {["boys", "girls"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedHostel(null);
              }}
              className={`flex-1 py-2 rounded-md text-sm transition-all
                ${activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-textSecondary hover:bg-card"
                }`}
            >
              {tab === "boys" ? "Boys Hostels" : "Girls Hostels"}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search hostel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-card border border-border
                     text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

        {/* Hostel Cards */}
        <div className="mt-4 space-y-3">
          {filteredHostels.length === 0 && (
            <p className="text-sm text-textSecondary text-center mt-6">
              No hostels found
            </p>
          )}

          {filteredHostels.map((h, index) => (
            <div
              key={`${h.id}-${index}`}
              onClick={() => setSelectedHostel(h)}
              className={`cursor-pointer rounded-2xl p-4 flex justify-between items-center
                transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95
                ${selectedHostel?.id === h.id && selectedHostel?.short === h.short
                  ? "bg-blue-50 border-2 border-primary"
                  : "bg-card"
                }`}
            >
              <div>
                <h3 className="font-medium">{h.name}</h3>
                <p className="text-sm text-textSecondary mt-1">{h.short}</p>
              </div>
              <span className="text-primary text-xl">→</span>
            </div>
          ))}
        </div>

        {/* Continue */}
        <button
          disabled={!selectedHostel}
          onClick={() => {
            localStorage.setItem("hostelId", selectedHostel.id);
            localStorage.setItem("hostelName", selectedHostel.short);

            navigate("/dashboard", {
              state: {
                hostelId: selectedHostel.id,
                hostelName: selectedHostel.short,
              },
            });
          }}
          className={`w-full mt-6 py-3 rounded-xl font-medium transition-all active:scale-95
    ${selectedHostel
              ? "bg-primary text-white"
              : "bg-border text-textSecondary cursor-not-allowed"
            }`}
        >
          Continue
        </button>

      </div>
    </div>
  );
}