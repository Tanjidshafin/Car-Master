import axios from "axios"
import { auth } from "../../firebase.init"
import { API_BASE_URL } from "../config/appConfig"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
})

apiClient.interceptors.request.use((config) => {
  const email = auth.currentUser?.email
  if (email) {
    config.headers["x-user-email"] = email
  }
  return config
})

export default apiClient
