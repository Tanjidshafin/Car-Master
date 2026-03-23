/* eslint-disable react/prop-types */
import { useContext } from "react"
import { Navigate, useLocation } from "react-router"
import { AppContext } from "./AppContext"
import UseUserRole from "../Hooks/UseUserRole"

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AppContext)
  const { role, roleLoading } = UseUserRole()
  const location = useLocation()

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
