import apiClient from "./apiClient"

export const bookingService = {
  createBooking: async (payload) => {
    const res = await apiClient.post("/bookings", payload)
    return res.data.data
  },
  getVendorBookings: async (params = {}) => {
    const res = await apiClient.get("/vendor/bookings", { params })
    return res.data
  },
  getMyBookings: async (params = {}) => {
    const res = await apiClient.get("/bookings/me", { params })
    return res.data
  },
  updateBookingStatus: async ({ id, status }) => {
    const res = await apiClient.patch(`/vendor/bookings/${id}/status`, { status })
    return res.data.data
  },
  createReservation: async (payload) => {
    const res = await apiClient.post("/reservations", payload)
    return res.data.data
  },
  getVendorReservations: async (params = {}) => {
    const res = await apiClient.get("/vendor/reservations", { params })
    return res.data
  },
  getMyReservations: async (params = {}) => {
    const res = await apiClient.get("/reservations/me", { params })
    return res.data
  },
  updateReservationStatus: async ({ id, status }) => {
    const res = await apiClient.patch(`/vendor/reservations/${id}/status`, { status })
    return res.data.data
  },
}
