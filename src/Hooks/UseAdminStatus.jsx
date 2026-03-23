import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { AppContext } from "../context/AppContext"
import adminApi from "./AdminApi"

const UseAdminStatus = () => {
  const { user, loading } = useContext(AppContext)

  const { data, isFetching, isError } = useQuery({
    queryKey: ["admin-status", user?.email],
    enabled: !loading && !!user?.email,
    retry: false,
    queryFn: async () => {
      const res = await adminApi.get("/me")
      return res.data.data
    },
  })

  return {
    isAdmin: !!data?.isAdmin,
    adminEmail: data?.email || null,
    isAdminLoading: isFetching,
    isAdminError: isError,
  }
}

export default UseAdminStatus
