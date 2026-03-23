/* eslint-disable react/prop-types */
import { CalendarRange, ShieldCheck, WalletCards } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { bookingService } from "../services/bookingService"
import { DashboardHero, DashboardShell, EmptyState, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, StatCard, StatCardSkeleton, SurfaceCard, TableSkeleton } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { AppContext } from "../context/AppContext"
import { formatCurrency } from "../utils/formatters"

const statusBadgeClass = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-200",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
  completed: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-200",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-200",
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
  cancelled: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200",
}

const StatusPill = ({ value }) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadgeClass[value] || "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}>
    {value}
  </span>
)

const MyBookings = () => {
  const { user, loading } = useContext(AppContext)
  const [bookingsPage, setBookingsPage] = useState(1)
  const [reservationsPage, setReservationsPage] = useState(1)
  const bookingsQuery = useQuery({
    queryKey: ["my-bookings", bookingsPage],
    enabled: !loading && !!user?.email,
    queryFn: () => bookingService.getMyBookings({ page: bookingsPage, limit: 8 }),
  })

  const reservationsQuery = useQuery({
    queryKey: ["my-reservations", reservationsPage],
    enabled: !loading && !!user?.email,
    queryFn: () => bookingService.getMyReservations({ page: reservationsPage, limit: 8 }),
  })

  const bookingsResponse = bookingsQuery.data
  const reservationsResponse = reservationsQuery.data
  const bookings = bookingsResponse?.data || []
  const reservations = reservationsResponse?.data || []
  const totalBookings = bookingsResponse?.total || 0
  const totalReservations = reservationsResponse?.total || 0
  const isInitialLoading = loading || (bookingsQuery.isLoading && !bookings.length) || (reservationsQuery.isLoading && !reservations.length)

  return (
    <DashboardShell>
      <DashboardHero
        title="My Bookings"
        description="Follow every test drive and reservation from one buyer-friendly dashboard with the newest status updates at the top."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {isInitialLoading ? (
          <StatCardSkeleton count={3} />
        ) : (
          <>
            <StatCard label="Test Drives" value={totalBookings} meta="Appointments you have requested." icon={CalendarRange} />
            <StatCard label="Reservations" value={totalReservations} meta="Vehicles you are holding with a deposit." icon={WalletCards} accent="emerald" />
            <StatCard
              label="Active Items"
              value={bookings.filter((item) => item.status === "pending" || item.status === "approved").length + reservations.filter((item) => item.status === "pending" || item.status === "confirmed").length}
              meta="Requests that still need attention or follow-up."
              icon={ShieldCheck}
              accent="amber"
            />
          </>
        )}
      </div>
      <div className="space-y-6">
        {bookingsQuery.isLoading && !bookings.length ? (
          <TableSkeleton columns={4} rows={4} />
        ) : (
        <SurfaceCard>
          <SectionHeading title="Test drive requests" description="Check the latest vendor response and keep your next visit on track." />
          {!bookings.length ? (
            <EmptyState title="No bookings yet" description="When you book a test drive, the request and its status will appear here." />
          ) : (
            <>
              <PremiumTable columns={["Car", "Schedule", "Phone", "Status"]}>
                {bookings.map((item) => (
                  <PremiumTableRow key={item._id}>
                    <PremiumTableCell>{item.car_name}</PremiumTableCell>
                    <PremiumTableCell>{item.booking_date} {item.booking_time}</PremiumTableCell>
                    <PremiumTableCell>{item.phone}</PremiumTableCell>
                    <PremiumTableCell><StatusPill value={item.status} /></PremiumTableCell>
                  </PremiumTableRow>
                ))}
              </PremiumTable>
              {bookingsResponse?.totalPages > 1 ? (
                <Pagination currentPage={bookingsPage} totalPages={bookingsResponse.totalPages} onPageChange={setBookingsPage} />
              ) : null}
            </>
          )}
        </SurfaceCard>
        )}
        {reservationsQuery.isLoading && !reservations.length ? (
          <TableSkeleton columns={4} rows={4} />
        ) : (
        <SurfaceCard>
          <SectionHeading title="Reservations" description="Review deposit-based holds and see whether the vendor has confirmed the next step." />
          {!reservations.length ? (
            <EmptyState title="No reservations yet" description="Reserved vehicles and confirmation updates will show up here." />
          ) : (
            <>
              <PremiumTable columns={["Car", "Deposit", "Status", "Note"]}>
                {reservations.map((item) => (
                  <PremiumTableRow key={item._id}>
                    <PremiumTableCell>{item.car_name}</PremiumTableCell>
                    <PremiumTableCell>{formatCurrency(item.deposit)}</PremiumTableCell>
                    <PremiumTableCell><StatusPill value={item.status} /></PremiumTableCell>
                    <PremiumTableCell>{item.note || "-"}</PremiumTableCell>
                  </PremiumTableRow>
                ))}
              </PremiumTable>
              {reservationsResponse?.totalPages > 1 ? (
                <Pagination currentPage={reservationsPage} totalPages={reservationsResponse.totalPages} onPageChange={setReservationsPage} />
              ) : null}
            </>
          )}
        </SurfaceCard>
      )}
      </div>
    </DashboardShell>
  )
}

export default MyBookings
