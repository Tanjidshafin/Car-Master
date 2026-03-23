import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AppContext } from "../context/AppContext"
import { bookingService } from "../services/bookingService"

export const useBookings = ({
  bookingsPage = 1,
  bookingsLimit = 8,
  reservationsPage = 1,
  reservationsLimit = 8,
} = {}) => {
  const queryClient = useQueryClient()
  const { user, loading } = useContext(AppContext)

  const bookingsQuery = useQuery({
    queryKey: ["vendor-bookings", bookingsPage, bookingsLimit],
    enabled: !loading && !!user?.email,
    queryFn: () => bookingService.getVendorBookings({ page: bookingsPage, limit: bookingsLimit }),
  })

  const reservationsQuery = useQuery({
    queryKey: ["vendor-reservations", reservationsPage, reservationsLimit],
    enabled: !loading && !!user?.email,
    queryFn: () => bookingService.getVendorReservations({ page: reservationsPage, limit: reservationsLimit }),
  })

  const updateBookingStatus = useMutation({
    mutationFn: bookingService.updateBookingStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-bookings"] }),
  })

  const updateReservationStatus = useMutation({
    mutationFn: bookingService.updateReservationStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-reservations"] }),
  })

  return {
    bookingsQuery,
    reservationsQuery,
    updateBookingStatus,
    updateReservationStatus,
  }
}
