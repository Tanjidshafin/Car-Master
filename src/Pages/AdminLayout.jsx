import { Outlet } from "react-router"
import { DashboardHero, DashboardShell, DashboardTabs } from "../Components/dashboard/PremiumShell"

const AdminLayout = () => {
  const navItems = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/cars", label: "Cars" },
    { to: "/admin/favorites", label: "Favorites" },
    { to: "/admin/vendor-requests", label: "Vendor Requests" },
    { to: "/admin/pending-listings", label: "Pending Listings" },
  ]

  return (
    <DashboardShell>
      <DashboardHero
        title="Admin Dashboard"
        description="Review inventory quality, monitor vendor activity, and keep the marketplace polished with a modern, brand-aligned control surface."
      />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <DashboardTabs items={navItems} />
        </div>
        <Outlet />
      </div>
    </DashboardShell>
  )
}

export default AdminLayout
