import { useContext, useMemo } from "react"
import { CalendarRange, CarFront, MessageSquareText } from "lucide-react"
import { useVendorCars } from "../../Hooks/useVendorCars"
import { useBookings } from "../../Hooks/useBookings"
import { useChat } from "../../Hooks/useChat"
import { StatCard, StatCardSkeleton } from "../../Components/dashboard/PremiumShell"
import { AppContext } from "../../context/AppContext"
import { normalizePaginatedData } from "../../utils/pagination"

const VendorDashboard = () => {
  const { loading } = useContext(AppContext)
  const { data: carsResponse, isLoading: carsLoading } = useVendorCars({ page: 1, limit: 1 })
  const { bookingsQuery } = useBookings({ bookingsPage: 1, bookingsLimit: 1 })
  const { conversationsQuery } = useChat()
  const normalizedCars = normalizePaginatedData(carsResponse, 1, 1)
  const normalizedBookings = normalizePaginatedData(bookingsQuery.data, 1, 1)

  const stats = useMemo(
    () => ({
      cars: normalizedCars.total,
      bookings: normalizedBookings.total,
      messages: conversationsQuery.data?.length || 0,
    }),
    [normalizedCars.total, normalizedBookings.total, conversationsQuery.data?.length],
  )

  if (loading || carsLoading || bookingsQuery.isLoading || conversationsQuery.isLoading) {
    return <div className="grid gap-4 md:grid-cols-3"><StatCardSkeleton count={3} /></div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Total Cars" value={stats.cars} meta="Listings currently managed in your vendor studio." icon={CarFront} />
      <StatCard label="Total Bookings" value={stats.bookings} meta="Buyer appointments and reservation activity in one place." icon={CalendarRange} accent="emerald" />
      <StatCard label="Total Messages" value={stats.messages} meta="Open conversations from interested buyers." icon={MessageSquareText} accent="amber" />
    </div>
  )
}

export default VendorDashboard
