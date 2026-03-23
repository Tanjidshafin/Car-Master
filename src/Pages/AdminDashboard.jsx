import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { CarFront, Heart } from "lucide-react"
import adminApi from "../Hooks/AdminApi"
import { AppContext } from "../context/AppContext"
import { StatCard, StatCardSkeleton } from "../Components/dashboard/PremiumShell"

const AdminDashboard = () => {
  const { user, loading } = useContext(AppContext)
  const { data: carsResponse, isLoading: carsLoading } = useQuery({
    queryKey: ["admin-dashboard-cars"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await adminApi.get("/cars", { params: { page: 1, limit: 1 } })
      return res.data
    },
  })

  const { data: favoritesResponse, isLoading: favoritesLoading } = useQuery({
    queryKey: ["admin-dashboard-favorites"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await adminApi.get("/favorites", { params: { page: 1, limit: 1 } })
      return res.data
    },
  })

  if (loading || carsLoading || favoritesLoading) {
    return <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><StatCardSkeleton count={2} /></div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard label="Total Cars" value={carsResponse?.total ?? carsResponse?.count ?? 0} meta="Published and draft inventory visible to admins." icon={CarFront} />
      <StatCard label="Total Favorites" value={favoritesResponse?.total ?? favoritesResponse?.count ?? 0} meta="Customer interest across all active listings." icon={Heart} accent="amber" />
    </div>
  )
}

export default AdminDashboard
