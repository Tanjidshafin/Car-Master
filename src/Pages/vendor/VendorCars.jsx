import { useContext, useState } from "react"
import { CarFront, Pencil, Plus, Trash2 } from "lucide-react"
import { useVendorCars } from "../../Hooks/useVendorCars"
import CarForm from "../../Components/vendor/CarForm"
import { EmptyState, PremiumButton, PremiumTable, PremiumTableCell, PremiumTableRow, SectionHeading, SurfaceCard, TableSkeleton } from "../../Components/dashboard/PremiumShell"
import Pagination from "../../Components/shared/Pagination"
import { AppContext } from "../../context/AppContext"
import { normalizePaginatedData } from "../../utils/pagination"
import { formatCurrency } from "../../utils/formatters"

const VendorCars = () => {
  const { loading } = useContext(AppContext)
  const [currentPage, setCurrentPage] = useState(1)
  const { data: carsResponse, isLoading, createCar, updateCar, deleteCar, markSold } = useVendorCars({ page: currentPage, limit: 8 })
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const normalizedCars = normalizePaginatedData(carsResponse, currentPage, 8)
  const cars = normalizedCars.data
  const totalPages = normalizedCars.totalPages
  const showPagination = totalPages > 1

  const openCreate = () => {
    setEditing(null)
    setShowForm(true)
  }

  const handleSubmit = (payload) => {
    if (editing) {
      updateCar.mutate({ id: editing._id, payload }, { onSuccess: () => setShowForm(false) })
    } else {
      createCar.mutate(payload, { onSuccess: () => setShowForm(false) })
    }
  }

  if (loading || (isLoading && !cars.length)) return <TableSkeleton columns={5} rows={5} action />

  return (
    <SurfaceCard>
      <SectionHeading
        title="Manage Cars"
        description="Create polished listings, update details, and keep inventory status current for serious buyers."
        action={
          <PremiumButton onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Listing
          </PremiumButton>
        }
      />

      {showForm ? (
        <div className="mb-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35 sm:p-5">
          <CarForm initialData={editing} onSubmit={handleSubmit} loading={createCar.isPending || updateCar.isPending} />
          <div className="text-right mt-2">
            <PremiumButton tone="ghost" onClick={() => setShowForm(false)}>Cancel</PremiumButton>
          </div>
        </div>
      ) : null}

      {!cars.length ? (
        <EmptyState title="No vendor cars yet" description="Create your first listing to start showcasing inventory to buyers." />
      ) : (
        <>
          <PremiumTable columns={["Name", "Price", "Listing", "Inventory", "Actions"]}>
            {cars.map((car) => (
              <PremiumTableRow key={car._id}>
                <PremiumTableCell>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200">
                      <CarFront className="h-5 w-5" />
                    </span>
                    <span>{car.name}</span>
                  </div>
                </PremiumTableCell>
                <PremiumTableCell>{formatCurrency(car.price)}</PremiumTableCell>
                <PremiumTableCell className="capitalize">{car.listing_status}</PremiumTableCell>
                <PremiumTableCell className="capitalize">{car.inventory_status}</PremiumTableCell>
                <PremiumTableCell>
                  <div className="flex flex-wrap gap-2">
                    <PremiumButton className="px-3 py-2 text-xs" onClick={() => { setEditing(car); setShowForm(true) }}>
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </PremiumButton>
                    <PremiumButton className="px-3 py-2 text-xs" tone="success" onClick={() => markSold.mutate(car._id)}>
                      Mark Sold
                    </PremiumButton>
                    <PremiumButton className="px-3 py-2 text-xs" tone="danger" onClick={() => deleteCar.mutate(car._id)}>
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Delete
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

export default VendorCars
