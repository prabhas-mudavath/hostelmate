import { useNavigate } from "react-router-dom";

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center space-y-4">
        <h1 className="text-xl font-semibold">Login As</h1>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition"
        >
          Student
        </button>

        <button
          onClick={() => navigate("/admin-login")}
          className="w-full py-2 bg-gray-800 text-white rounded-lg active:scale-95 transition"
        >
          Warden / Admin
        </button>
      </div>
    </div>
  );
}
