import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassBackground from "../components/GlassBackground";
export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("hostelId", data.hostelId);

      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <GlassBackground>
      <div className="w-80 p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Student Login
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded bg-white/20 outline-none placeholder-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded bg-white/20 outline-none placeholder-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700  active:scale-95 transition-transform duration-150
"
        >
          Login
        </button>
      </div>
    </GlassBackground>
  );
}