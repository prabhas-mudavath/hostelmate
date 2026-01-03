import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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
  useEffect(() => {
    if (!token || activeTab !== "complaints") return;

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
  useEffect(() => {
    if (!token || activeTab !== "notices") return;

    fetch(`${import.meta.env.VITE_API_URL}/api/notices`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(() => toast.error("Failed to load notices"));
  }, [activeTab, token]);

  /* ================= USER LOGIN ================= */
  const userLogin = async (e) => {
    e.preventDefault();
    const f = e.target;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: f.email.value,
          password: f.password.value
        })
      }
    );

    const data = await res.json();

    if (!data.token) {
      toast.error("Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    toast.success("Login successful");
  };

  /* ================= ADMIN LOGIN ================= */
  const adminLogin = async (e) => {
    e.preventDefault();
    const f = e.target;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: f.username.value,
          password: f.password.value
        })
      }
    );

    const data = await res.json();

    if (!data.token) {
      toast.error("Admin login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    toast.success("Admin login successful");
  };
  const totalComplaints = complaints.length;
  const openComplaints = complaints.filter(c => c.status === "open").length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUserId(null);
    toast.success("Logged out");
  };

  /* ================= LOGIN PAGE ================= */
  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center gap-10 bg-gray-100">
        <Toaster position="top-right" />

        <form onSubmit={userLogin} className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>
          <input name="email" placeholder="Email" className="border p-2 w-full mb-2" />
          <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-4" />
          <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
        </form>

        <form onSubmit={adminLogin} className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input name="username" placeholder="Username" className="border p-2 w-full mb-2" />
          <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-4" />
          <button className="bg-black text-white w-full py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  /* ================= DASHBOARD ================= */
return (
  <div className={darkMode ? "dark" : ""}>
    <Toaster position="top-right" />
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* ===== SIDEBAR ===== */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">HostelMate</h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 w-full border px-3 py-1 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <nav className="space-y-2">
          {["complaints", "notices", "services"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-2 rounded ${
                activeTab === tab ? "bg-blue-600 text-white" : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-6 w-full bg-gray-900 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-6 space-y-6">

        <h1 className="text-3xl font-bold">
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Complaints</h3>
            <p className="text-3xl font-bold">{totalComplaints}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Open</h3>
            <p className="text-3xl font-bold text-red-500">
              {openComplaints}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Resolved</h3>
            <p className="text-3xl font-bold text-green-500">
              {resolvedComplaints}
            </p>
          </div>
        </div>
        

        {/* ===== CHARTS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              Complaint Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Open", value: openComplaints },
                    { name: "Resolved", value: resolvedComplaints }
                  ]}
                  dataKey="value"
                  outerRadius={100}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {role === "admin" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Complaints Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Open", count: openComplaints },
                    { name: "Resolved", count: resolvedComplaints }
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* ===== TAB CONTENT ===== */}
        {loading && <p>Loading...</p>}

        {activeTab === "complaints" && (
          <div className="space-y-4">
            {complaints.length === 0 && <p>No complaints found</p>}
            {complaints.map(c => (
              <div
                key={c._id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <h3 className="font-bold">{c.title}</h3>
                <p>Status: {c.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-4">
            {notices.length === 0 && <p>No notices available</p>}
            {notices.map(n => (
              <div
                key={n._id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <h3 className="font-bold">{n.title}</h3>
                <p>{n.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-2 gap-2">
            {["Electrician", "Plumber", "Carpenter", "Housekeeping"].map(s => (
              <div
                key={s}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between"
              >
                <span>{s}</span>
                <button
                  onClick={() => toast.success("Service requested")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default App;
