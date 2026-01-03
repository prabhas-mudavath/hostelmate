import { Link } from "react-router-dom";

export default function AdminSidebar({ pendingCount }) {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <nav className="space-y-4">

        {/* Requests */}
        <Link
          to="/admin/requests"
          className="relative block font-medium p-2 rounded hover:bg-gray-100"
        >
          Requests
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </Link>

        {/* Laundry */}
        <Link
          to="/admin/laundry"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Laundry
        </Link>

        {/* Services */}
        <Link
          to="/admin/services"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Services
        </Link>

        {/* Notices */}
        <Link
          to="/admin/notices"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Notices
        </Link>

      </nav>
    </aside>
  );
}
