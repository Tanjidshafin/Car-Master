import axios from "axios"
import { auth } from "../../firebase.init"
import { ADMIN_API_BASE_URL } from "../config/appConfig"

const adminApi = axios.create({
  baseURL: ADMIN_API_BASE_URL,
})

adminApi.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser
  if (currentUser?.email) {
    config.headers["x-user-email"] = currentUser.email
  }
  return config
})

export default adminApi
