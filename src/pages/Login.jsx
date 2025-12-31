import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/hostel");
    }
  };



  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">

        <h1 className="text-xl font-semibold text-center">
          HostelMate Login
        </h1>

        <p className="text-sm text-gray-500 text-center mt-1">
          Select role to continue
        </p>

        <div className="mt-4 space-y-3">
          <button
            onClick={() => setRole("student")}
            className={`w-full py-2 rounded-lg border
              ${role === "student"
                ? "bg-blue-600 text-white"
                : "bg-white"
              }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`w-full py-2 rounded-lg border
              ${role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-white"
              }`}
          >
            Admin
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-5 py-2 rounded-lg bg-black text-white"
        >
          Login
        </button>

      </div>
    </div>
  );
}
