import { Navigate } from "react-router-dom";

export default function AuthGate({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "student") {
    return children;
  }

  if (role === "warden" || role === "chief") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
}
