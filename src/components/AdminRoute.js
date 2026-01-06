import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || (role !== "warden" && role !== "chief")) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}
