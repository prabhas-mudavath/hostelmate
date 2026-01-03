import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  FileWarning, Bell, Wrench, LogOut
} from "lucide-react";

/* ================= SAFE TOKEN DECODE ================= */
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("complaints");
  const [darkMode, setDarkMode] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      setToken(null);
      return;
    }
    setRole(decoded.role || "user");
    setUserId(decoded.id);
  }, [token]);

  /* ================= FETCH COMPLAINTS ================= */
  useEffect(() => {
    if (!token || activeTab !== "complaints") return;
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load complaints");
        setLoading(false);
      });
  }, [activeTab, token]);

  /* ================= FETCH NOTICES ================= */
  useEffect(() => {
    if (!token || activeTab !== "notices") return;

    fetch(`${import.meta.env.VITE_API_URL}/api/notices`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(() => toast.error("Failed to load notices"));
  }, [activeTab, token]);

  /* ================= LOGIN ================= */
  const userLogin = async (e) => {
    e.preventDefault();
    const f = e.target;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: f.email.value,
        password: f.password.value
      })
    });

    const data = await res.json();
    if (!data.token) return toast.error("Login failed");

    localStorage.setItem("token", data.token);
    setToken(data.token);
    toast.success("Login successful");
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    const f = e.target;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: f.username.value,
        password: f.password.value
      })
    });

    const data = await res.json();
    if (!data.token) return toast.error("Admin login failed");

    localStorage.setItem("token", data.token);
    setToken(data.token);
    toast.success("Admin login successful");
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    toast.success("Logged out");
  };

  /* ================= ANALYTICS ================= */
  const totalComplaints = complaints.length;
  const openComplaints = complaints.filter(c => c.status === "open").length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;

  const categoryData = [
    { name: "Water", count: complaints.filter(c => c.category === "water").length },
    { name: "Electrical", count: complaints.filter(c => c.category === "electrical").length },
    { name: "Mess", count: complaints.filter(c => c.category === "mess").length }
  ];

  const monthlyMap = {};
  complaints.forEach(c => {
    const month = new Date(c.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });
  const monthlyChartData = Object.keys(monthlyMap).map(m => ({
    month: m,
    count: monthlyMap[m]
  }));

  const resolveComplaint = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/${id}/resolve`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error();
      toast.success("Complaint resolved");
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: "resolved" } : c));
    } catch {
      toast.error("Failed to resolve complaint");
    }
  };

  /* ================= LOGIN PAGE ================= */
  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center gap-10 bg-gray-100">
        <Toaster />
        <form onSubmit={userLogin} className="bg-white p-6 rounded shadow w-80">
          <h2 className="font-bold mb-4 text-center">User Login</h2>
          <input name="email" className="border p-2 w-full mb-2" placeholder="Email" />
          <input name="password" type="password" className="border p-2 w-full mb-4" placeholder="Password" />
          <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
        </form>

        <form onSubmit={adminLogin} className="bg-white p-6 rounded shadow w-80">
          <h2 className="font-bold mb-4 text-center">Admin Login</h2>
          <input name="username" className="border p-2 w-full mb-2" placeholder="Username" />
          <input name="password" type="password" className="border p-2 w-full mb-4" placeholder="Password" />
          <button className="bg-black text-white w-full py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className={darkMode ? "dark" : ""}>
      <Toaster />
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

        {/* SIDEBAR */}
        <div className="w-64 bg-white dark:bg-gray-800 p-4 space-y-2">
          <button onClick={() => setDarkMode(!darkMode)} className="border w-full py-1 rounded">
            Toggle Mode
          </button>

          {[
            ["complaints", <FileWarning size={18} />],
            ["notices", <Bell size={18} />],
            ["services", <Wrench size={18} />]
          ].map(([tab, icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 w-full p-2 rounded ${
                activeTab === tab ? "bg-blue-600 text-white" : ""
              }`}
            >
              {icon} {tab}
            </button>
          ))}

          <button onClick={logout} className="flex gap-2 items-center text-red-500">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="flex-1 p-6 space-y-6">

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            {[["Total", totalComplaints], ["Open", openComplaints], ["Resolved", resolvedComplaints]]
              .map(([t, v]) => (
                <div key={t} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <p className="text-sm">{t}</p>
                  <p className="text-2xl font-bold">{v}</p>
                </div>
              ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer height={300}>
              <PieChart>
                <Pie data={[{ name: "Open", value: openComplaints }, { name: "Resolved", value: resolvedComplaints }]} dataKey="value">
                  <Cell fill="#ef4444" />
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ResponsiveContainer height={300}>
            <LineChart data={monthlyChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="count" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          {/* COMPLAINT LIST */}
          {activeTab === "complaints" && complaints.map(c => (
            <div key={c._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between">
              <div>
                <h3>{c.title}</h3>
                <p>{c.status}</p>
              </div>
              {role === "admin" && c.status === "open" && (
                <button onClick={() => resolveComplaint(c._id)} className="bg-green-600 text-white px-3 py-1 rounded">
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
