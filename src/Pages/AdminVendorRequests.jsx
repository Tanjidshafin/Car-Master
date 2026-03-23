import { useState } from "react"
import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "../services/apiClient"
import { EmptyState, PremiumButton, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, SurfaceCard, TableSkeleton } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { AppContext } from "../context/AppContext"

const AdminVendorRequests = () => {
  const { user, loading } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: requestsResponse, isLoading } = useQuery({
    queryKey: ["admin-vendor-requests", currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await apiClient.get("/admin/vendor-requests", { params: { page: currentPage, limit: 8 } })
      return res.data
    },
  })

  const updateRequest = useMutation({
    mutationFn: async ({ id, status }) => apiClient.patch(`/admin/vendor-requests/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-vendor-requests"] }),
  })
  const requests = requestsResponse?.data || []
  const totalPages = requestsResponse?.totalPages || 1
  const showPagination = totalPages > 1

  if (loading || (isLoading && !requests.length)) return <TableSkeleton columns={5} rows={5} />

  return (
    <SurfaceCard>
      <SectionHeading
        title="Vendor Requests"
        description="Approve qualified sellers or reject incomplete submissions without leaving the moderation flow."
      />
      {!requests.length ? (
        <EmptyState title="No vendor requests" description="New seller applications will appear here when users apply for vendor access." />
      ) : (
        <>
          <PremiumTable columns={["Email", "Business", "Location", "Status", "Actions"]}>
            {requests.map((item) => (
              <PremiumTableRow key={item._id}>
                <PremiumTableCell>{item.email}</PremiumTableCell>
                <PremiumTableCell>{item.business_name}</PremiumTableCell>
                <PremiumTableCell>{item.location}</PremiumTableCell>
                <PremiumTableCell>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                    {item.status}
                  </span>
                </PremiumTableCell>
                <PremiumTableCell>
                  <div className="flex flex-wrap gap-2">
                    <PremiumButton className="px-3 py-2 text-xs" tone="success" onClick={() => updateRequest.mutate({ id: item._id, status: "approved" })}>
                      Approve
                    </PremiumButton>
                    <PremiumButton className="px-3 py-2 text-xs" tone="danger" onClick={() => updateRequest.mutate({ id: item._id, status: "rejected" })}>
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

export default AdminVendorRequests
