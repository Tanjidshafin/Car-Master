const normalizeBaseUrl = (value) => value?.replace(/\/+$/, "") || ""
const stripApiSuffix = (value) => value.replace(/\/api$/i, "")

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
export const ADMIN_API_BASE_URL = `${API_BASE_URL}/admin`
export const SOCKET_URL = stripApiSuffix(API_BASE_URL)
