import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { TickIcon, CrossIcon } from "./components/StatusIcon";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const [activeTab, setActiveTab] = useState("complaints");
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* ================= TOKEN DECODE ================= */
  const decodeToken = (token) =>
    JSON.parse(atob(token.split(".")[1]));

  /* ================= ADMIN LOGIN ================= */
  const adminLogin = async (e) => {
    e.preventDefault();
    const f = e.target;

    try {
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
      if (!data.token) throw new Error();

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setRole("admin");
      setUserId(decodeToken(data.token).id);

      toast.success("Admin login successful");
    } catch {
      toast.error("Admin login failed");
    }
  };

  /* ================= USER LOGIN ================= */
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
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };



  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUserId(null);
    toast.success("Logged out");
  };

  /* ================= INIT ================= */
  useEffect(() => {
    if (token) {
      const d = decodeToken(token);
      setRole(d.role || "admin");
      setUserId(d.id);
    }
  }, [token]);

  /* ================= FETCH COMPLAINTS ================= */
  useEffect(() => {
    if (!token || activeTab !== "complaints") return;

    setLoading(true);
    let url = `${import.meta.env.VITE_API_URL}/api/complaints`;
    if (role === "user") url += `?userId=${userId}`;

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
  }, [token, role, userId, activeTab]);

  /* ================= FETCH NOTICES ================= */
  useEffect(() => {
    if (activeTab !== "notices") return;

    fetch(`${import.meta.env.VITE_API_URL}/api/notices`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setNotices(data))
      .catch(() => toast.error("Failed to load notices"));
  }, [activeTab, token]);

  /* ================= ADD COMPLAINT ================= */
  const addComplaint = async (e) => {
    e.preventDefault();
    const f = e.target;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            hostelId: f.hostelId.value,
            title: f.title.value,
            category: f.category.value
          })
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Complaint submitted successfully");
      f.reset();
      setActiveTab("complaints");
    } catch {
      toast.error("Server not reachable");
    }
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
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 dark:text-white">
        <Toaster position="top-right" />

        <div className="w-64 bg-white dark:bg-gray-800 shadow p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">HostelMate</h2>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 w-full border px-3 py-1 rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <nav className="space-y-2">
            <button onClick={() => setActiveTab("complaints")} className="w-full text-left p-2 rounded">
              Complaints
            </button>
            <button onClick={() => setActiveTab("notices")} className="w-full text-left p-2 rounded">
              Notices
            </button>
            <button onClick={() => setActiveTab("laundry")} className="w-full text-left p-2 rounded">
              Laundry
            </button>
            <button onClick={() => setActiveTab("services")} className="w-full text-left p-2 rounded">
              Services
            </button>
          </nav>

          <button onClick={logout} className="mt-6 w-full bg-gray-900 text-white py-2 rounded">
            Logout
          </button>
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </h1>

          {activeTab === "services" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-6">Hostel Services</h2>
              {["Electrician", "Plumber", "Carpenter", "Housekeeping"].map(service => (
                <div key={service} className="border p-4 rounded flex justify-between items-center mb-3">
                  <span>{service}</span>
                  <button
                    onClick={() => toast.success("Service request submitted")}
                    className="bg-green-600 text-white px-4 py-1 rounded"
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
