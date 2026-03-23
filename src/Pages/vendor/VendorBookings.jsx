import { useContext, useState } from "react"
import { useBookings } from "../../Hooks/useBookings"
import { EmptyState, PremiumSelect, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, SurfaceCard, TableSkeleton } from "../../Components/dashboard/PremiumShell"
import Pagination from "../../Components/shared/Pagination"
import { AppContext } from "../../context/AppContext"
import { normalizePaginatedData } from "../../utils/pagination"
import { formatCurrency } from "../../utils/formatters"

const VendorBookings = () => {
  const { loading } = useContext(AppContext)
  const [bookingsPage, setBookingsPage] = useState(1)
  const [reservationsPage, setReservationsPage] = useState(1)
  const { bookingsQuery, reservationsQuery, updateBookingStatus, updateReservationStatus } = useBookings({
    bookingsPage,
    bookingsLimit: 8,
    reservationsPage,
    reservationsLimit: 8,
  })
  const bookingsResponse = normalizePaginatedData(bookingsQuery.data, bookingsPage, 8)
  const reservationsResponse = normalizePaginatedData(reservationsQuery.data, reservationsPage, 8)
  const bookings = bookingsResponse.data
  const reservations = reservationsResponse.data
  const bookingsTotalPages = bookingsResponse.totalPages
  const reservationsTotalPages = reservationsResponse.totalPages

  return (
    <div className="space-y-6">
      {loading || (bookingsQuery.isLoading && !bookings.length) ? (
        <TableSkeleton columns={4} rows={4} />
      ) : (
      <SurfaceCard>
        <SectionHeading
          title="Bookings"
          description="Review buyer scheduling details and update the status as the deal progresses."
        />
        {!bookings.length ? (
          <EmptyState title="No bookings yet" description="Buyer booking requests will appear here as soon as interest turns into appointments." />
        ) : (
          <>
            <PremiumTable columns={["Customer", "Car", "Date", "Status"]}>
              {bookings.map((item) => (
                <PremiumTableRow key={item._id}>
                  <PremiumTableCell>{item.customer_name}</PremiumTableCell>
                  <PremiumTableCell>{item.car_name}</PremiumTableCell>
                  <PremiumTableCell>{item.booking_date} {item.booking_time}</PremiumTableCell>
                  <PremiumTableCell>
                    <PremiumSelect
                      className="max-w-44"
                      value={item.status}
                      onChange={(e) => updateBookingStatus.mutate({ id: item._id, status: e.target.value })}
                    >
                      {["pending", "approved", "rejected", "completed"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </PremiumSelect>
                  </PremiumTableCell>
                </PremiumTableRow>
              ))}
            </PremiumTable>
            {bookingsTotalPages > 1 ? (
              <Pagination currentPage={bookingsPage} totalPages={bookingsTotalPages} onPageChange={setBookingsPage} />
            ) : null}
          </>
          )}
        </SurfaceCard>
      )}
      {loading || (reservationsQuery.isLoading && !reservations.length) ? (
        <TableSkeleton columns={4} rows={4} />
      ) : (
      <SurfaceCard>
        <SectionHeading
          title="Reservations"
          description="Manage reserved inventory and keep deposit-based sales moving with clear status updates."
        />
        {!reservations.length ? (
          <EmptyState title="No reservations yet" description="Deposits and reservation intent will appear here once buyers start holding vehicles." />
        ) : (
          <>
            <PremiumTable columns={["User", "Car", "Deposit", "Status"]}>
              {reservations.map((item) => (
                <PremiumTableRow key={item._id}>
                  <PremiumTableCell>{item.user_email}</PremiumTableCell>
                  <PremiumTableCell>{item.car_name}</PremiumTableCell>
                  <PremiumTableCell>{formatCurrency(item.deposit)}</PremiumTableCell>
                  <PremiumTableCell>
                    <PremiumSelect
                      className="max-w-44"
                      value={item.status}
                      onChange={(e) => updateReservationStatus.mutate({ id: item._id, status: e.target.value })}
                    >
                      {["pending", "confirmed", "cancelled"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </PremiumSelect>
                  </PremiumTableCell>
                </PremiumTableRow>
              ))}
            </PremiumTable>
            {reservationsTotalPages > 1 ? (
              <Pagination currentPage={reservationsPage} totalPages={reservationsTotalPages} onPageChange={setReservationsPage} />
            ) : null}
          </>
          )}
        </SurfaceCard>
      )}
    </div>
  )
}

export default VendorBookings
