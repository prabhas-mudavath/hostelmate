export default function AdminSidebar({ pendingCount }) {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <nav className="space-y-4">

        <div className="relative font-medium">
          Requests
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>

        <div>Laundry</div>
        <div>Services</div>
        <div>Notices</div>

      </nav>
    </aside>
  );
}
