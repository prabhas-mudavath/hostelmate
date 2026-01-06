import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassBackground from "../../components/GlassBackground";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const login = async () => {
    const res = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("hostelId", data.hostelId);

      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <GlassBackground>
      <div className="w-80 p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        <input
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 rounded bg-white/20 outline-none placeholder-white"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded bg-white/20 outline-none placeholder-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full py-2 rounded bg-black/70 hover:bg-black transition"
        >
          Login
        </button>
      </div>
    </GlassBackground>
  );
}
