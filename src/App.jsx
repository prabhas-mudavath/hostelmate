import { Routes, Route, Navigate } from "react-router-dom";

import HostelSelect from "./pages/HostelSelect";
import Dashboard from "./pages/Dashboard";
import MessMenu from "./pages/MessMenu";
import Complaints from "./pages/Complaints";
import Notices from "./pages/Notices";
import Laundry from "./pages/Laundry";
import Services from "./pages/Services";

import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminNotices from "./pages/admin/AdminNotices";

import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* USER FLOW */}
      <Route
        path="/hostel-select"
        element={
          <ProtectedRoute>
            <HostelSelect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/mess" element={<ProtectedRoute><MessMenu /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
      <Route path="/laundry" element={<ProtectedRoute><Laundry /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />

      {/* ADMIN FLOW */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/complaints"
        element={
          <AdminRoute>
            <AdminComplaints />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/notices"
        element={
          <AdminRoute>
            <AdminNotices />
          </AdminRoute>
        }
      />

    </Routes>
  );
}
