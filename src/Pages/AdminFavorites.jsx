import { useState } from "react"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { RotateCcw, Search } from "lucide-react"
import adminApi from "../Hooks/AdminApi"
import { EmptyState, PremiumButton, PremiumInput, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, SurfaceCard, TableSkeleton } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { AppContext } from "../context/AppContext"
import { formatCurrency, formatDateTime } from "../utils/formatters"

const AdminFavorites = () => {
  const { user, loading } = useContext(AppContext)
  const [searchEmail, setSearchEmail] = useState("")
  const [appliedEmail, setAppliedEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: favoritesResponse, isFetching } = useQuery({
    queryKey: ["admin-favorites", appliedEmail, currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await adminApi.get("/favorites", {
        params: { email: appliedEmail || undefined, page: currentPage, limit: 8 },
      })
      return res.data
    },
  })
  const favorites = favoritesResponse?.data || []
  const totalPages = favoritesResponse?.totalPages || 1
  const showPagination = totalPages > 1

  return (
    <SurfaceCard>
      <SectionHeading
        title="Favorite Cars"
        description="Track what shoppers are saving most often and filter by buyer email when you need a specific history."
      />
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:flex-1" />
        <PremiumInput
          type="email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Filter by email"
          className="w-full md:max-w-sm"
        />
        <PremiumButton
          onClick={() => {
            setCurrentPage(1)
            setAppliedEmail(searchEmail.trim())
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </PremiumButton>
        <PremiumButton
          onClick={() => {
            setSearchEmail("")
            setAppliedEmail("")
            setCurrentPage(1)
          }}
          tone="ghost"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </PremiumButton>
      </div>

      {loading || (isFetching && !favorites.length) ? (
        <TableSkeleton columns={6} rows={5} title={false} />
      ) : favorites.length === 0 ? (
        <EmptyState title="No favorites found" description="There are no saved cars for the current filter yet." />
      ) : (
        <>
          <PremiumTable columns={["User Email", "Car", "Brand", "Price", "Added At", "Car ID"]}>
            {favorites.map((item) => (
              <PremiumTableRow key={item._id}>
                <PremiumTableCell>{item.email}</PremiumTableCell>
                <PremiumTableCell>{item.name}</PremiumTableCell>
                <PremiumTableCell>{item.brand}</PremiumTableCell>
                <PremiumTableCell>{formatCurrency(item.price)}</PremiumTableCell>
                <PremiumTableCell>{formatDateTime(item.createdAt)}</PremiumTableCell>
                <PremiumTableCell className="font-mono text-xs text-slate-400">{item.carId || item.id}</PremiumTableCell>
              </PremiumTableRow>
            ))}
          </PremiumTable>
          {showPagination ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> : null}
        </>
      )}
    </SurfaceCard>
  )
}

export default AdminFavorites
