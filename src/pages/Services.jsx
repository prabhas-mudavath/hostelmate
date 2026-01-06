const services = [
  { name: "Cobbler", contact: "9876543210" },
  { name: "Cycle Stand", contact: "9123456780" },
  { name: "Mess Caterer", contact: "9988776655" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 fade-in">
      <h1 className="text-xl font-semibold mb-4">Service Directory</h1>

      {services.map((s) => (
        <div key={s.name} className="bg-white p-4 rounded-xl shadow-sm mb-3">
          <p className="font-medium">{s.name}</p>
          <p className="text-sm text-gray-600">Contact: {s.contact}</p>
        </div>
      ))}
    </div>
  );
}
