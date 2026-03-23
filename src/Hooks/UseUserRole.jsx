import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import BaseUrl from "./BaseUrl"
import { AppContext } from "../context/AppContext"

const UseUserRole = () => {
  const { user, loading } = useContext(AppContext)
  const link = BaseUrl()

  const { data, isFetching } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await link.get("/users/me-role")
      return res.data.data
    },
  })

  return {
    role: data?.role || "user",
    roleUser: data || null,
    roleLoading: isFetching,
  }
}

export default UseUserRole
