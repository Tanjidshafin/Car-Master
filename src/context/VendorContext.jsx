import { createContext, useContext, useMemo } from "react"
import UseUserRole from "../Hooks/UseUserRole"

const VendorContext = createContext({ isVendor: false, role: "user", roleLoading: false })

export const VendorProvider = ({ children }) => {
  const { role, roleLoading, roleUser } = UseUserRole()
  const value = useMemo(
    () => ({
      role,
      roleLoading,
      roleUser,
      isVendor: role === "vendor",
      isAdmin: role === "admin",
    }),
    [role, roleLoading, roleUser],
  )

  return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
}

export const useVendorContext = () => useContext(VendorContext)
