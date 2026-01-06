import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const allowedRoles = ["admin", "warden", "chief"];

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
