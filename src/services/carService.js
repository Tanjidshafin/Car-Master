import apiClient from "./apiClient"

export const carService = {
  getVendorCars: async (params = {}) => {
    const res = await apiClient.get("/vendor/cars", { params })
    return res.data
  },
  createVendorCar: async (payload) => {
    const res = await apiClient.post("/vendor/cars", payload)
    return res.data.data
  },
  updateVendorCar: async ({ id, payload }) => {
    const res = await apiClient.patch(`/vendor/cars/${id}`, payload)
    return res.data.data
  },
  deleteVendorCar: async (id) => {
    const res = await apiClient.delete(`/vendor/cars/${id}`)
    return res.data
  },
  markCarSold: async (id) => {
    const res = await apiClient.patch(`/vendor/cars/${id}/mark-sold`)
    return res.data.data
  },
  getVendorProfile: async (vendorId) => {
    const res = await apiClient.get(`/vendors/${vendorId}`)
    return res.data.data
  },
}
