import { useState } from "react"
import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "../services/apiClient"
import { EmptyState, PremiumButton, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, SurfaceCard, TableSkeleton } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { AppContext } from "../context/AppContext"
import { formatCurrency } from "../utils/formatters"

const AdminPendingListings = () => {
  const { user, loading } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: carsResponse, isLoading } = useQuery({
    queryKey: ["admin-pending-cars", currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await apiClient.get("/admin/cars/pending", { params: { page: currentPage, limit: 8 } })
      return res.data
    },
  })

  const moderate = useMutation({
    mutationFn: async ({ id, status }) => apiClient.patch(`/admin/cars/${id}/moderate`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-pending-cars"] }),
  })
  const cars = carsResponse?.data || []
  const totalPages = carsResponse?.totalPages || 1
  const showPagination = totalPages > 1

  if (loading || (isLoading && !cars.length)) return <TableSkeleton columns={4} rows={5} />

  return (
    <SurfaceCard>
      <SectionHeading
        title="Pending listings"
        description="Validate presentation quality and listing standards before vehicles go live on the marketplace."
      />
      {!cars.length ? (
        <EmptyState title="No pending listings" description="Fresh submissions will show up here when vendors send cars for review." />
      ) : (
        <>
          <PremiumTable columns={["Name", "Vendor", "Price", "Actions"]}>
            {cars.map((car) => (
              <PremiumTableRow key={car._id}>
                <PremiumTableCell>{car.name}</PremiumTableCell>
                <PremiumTableCell>{car.vendor_name || car.vendor_email}</PremiumTableCell>
                <PremiumTableCell>{formatCurrency(car.price)}</PremiumTableCell>
                <PremiumTableCell>
                  <div className="flex flex-wrap gap-2">
                    <PremiumButton className="px-3 py-2 text-xs" tone="success" onClick={() => moderate.mutate({ id: car._id, status: "approved" })}>
                      Approve
                    </PremiumButton>
                    <PremiumButton className="px-3 py-2 text-xs" tone="danger" onClick={() => moderate.mutate({ id: car._id, status: "rejected" })}>
                      Reject
                    </PremiumButton>
                  </div>
                </PremiumTableCell>
              </PremiumTableRow>
            ))}
          </PremiumTable>
          {showPagination ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> : null}
        </>
      )}
    </SurfaceCard>
  )
}

export default AdminPendingListings
