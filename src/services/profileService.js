import apiClient from "./apiClient"

export const profileService = {
  getMyProfile: async () => {
    const res = await apiClient.get("/users/me")
    return res.data.data
  },
  updateMyProfile: async (payload) => {
    const res = await apiClient.patch("/users/me", payload)
    return res.data.data
  },
}
