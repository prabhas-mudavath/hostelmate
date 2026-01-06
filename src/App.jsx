import { Routes, Route, Navigate } from "react-router-dom";

import HostelSelect from "./pages/HostelSelect";
import Dashboard from "./pages/Dashboard";
import MessMenu from "./pages/MessMenu";
import Complaints from "./pages/Complaints";
import Notices from "./pages/Notices";
import Laundry from "./pages/Laundry";
import Services from "./pages/Services";
import AddComplaint from "./pages/AddComplaint";
/* ADMIN */
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminComplaints from "./pages/admin/AdminComplaints";
import MyRequests from "./pages/MyRequests";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hostel-select" />} />

      {/* USER ROUTES */}
      <Route path="/hostel-select" element={<HostelSelect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mess" element={<MessMenu />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/laundry" element={<Laundry />} />
      <Route path="/services" element={<Services />} />
      <Route path="/add-complaint" element={<AddComplaint />} />
      <Route path="/my-requests" element={<MyRequests />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
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
      <Route
        path="/admin/complaints"
        element={
          <AdminRoute>
            <AdminComplaints />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
