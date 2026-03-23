import { Outlet } from "react-router"
import { BadgeDollarSign, CalendarRange, CarFront, LayoutDashboard, MessageSquareText } from "lucide-react"
import { DashboardHero, DashboardShell, DashboardTabs } from "../../Components/dashboard/PremiumShell"

const VendorLayout = () => {
  const navItems = [
    { to: "/vendor/dashboard", label: "Overview" },
    { to: "/vendor/cars", label: "Manage Cars" },
    { to: "/vendor/bookings", label: "Bookings" },
    { to: "/vendor/messages", label: "Messages" },
  ]

  return (
    <DashboardShell>
      <DashboardHero
        title="Vendor Dashboard"
        description="A refined workspace for vendors to review listings, track reservations, and stay responsive without losing the premium Car Master feel."       
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

export default VendorLayout
