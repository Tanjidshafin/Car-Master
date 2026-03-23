import { useMemo, useState } from "react"
import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import adminApi from "../Hooks/AdminApi"
import { EmptyState, PremiumButton, PremiumDialog, PremiumInput, PremiumSelect, PremiumTable, PremiumTableCell, PremiumTableRow, PremiumTextarea, SectionHeading, SurfaceCard, TableSkeleton } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { AppContext } from "../context/AppContext"
import { formatCurrency } from "../utils/formatters"

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  price: "",
  image: "",
  status: "recommended",
  rating: "",
  description: "",
  year: "",
  speed: "",
  transmission: "",
  color: "",
  condition: "",
  imagesCsv: "",
  vendor_id: "",
}

const AdminCars = () => {
  const { user, loading } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [vendorSearch, setVendorSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: carsResponse, isFetching } = useQuery({
    queryKey: ["admin-cars", currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await adminApi.get("/cars", { params: { page: currentPage, limit: 8 } })
      return res.data
    },
  })

  const { data: vendors = [] } = useQuery({
    queryKey: ["admin-vendors", vendorSearch],
    queryFn: async () => {
      const params = vendorSearch.trim() ? `?q=${encodeURIComponent(vendorSearch.trim())}` : ""
      const res = await adminApi.get(`/vendors${params}`)
      return res.data.data
    },
  })
  const cars = carsResponse?.data || []
  const totalPages = carsResponse?.totalPages || 1
  const showPagination = totalPages > 1

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCar(null)
    setForm(emptyForm)
    setVendorSearch("")
  }

  const toPayload = useMemo(
    () => (value) => {
      const payload = {
        name: value.name,
        brand: value.brand,
        model: value.model,
        price: Number(value.price),
        image: value.image,
        status: value.status,
        specs: {
          year: value.year,
          speed: value.speed,
          transmission: value.transmission,
          color: value.color,
          condition: value.condition,
        },
      }

      if (value.rating !== "") payload.rating = Number(value.rating)
      if (value.description.trim()) payload.description = value.description.trim()
      if (value.imagesCsv.trim()) {
        payload.images = value.imagesCsv
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      }
      payload.vendor_id = value.vendor_id || null
      return payload
    },
    [],
  )

  const createCar = useMutation({
    mutationFn: async (payload) => adminApi.post("/cars", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] })
      closeModal()
    },
  })

  const updateCar = useMutation({
    mutationFn: async ({ id, payload }) => adminApi.patch(`/cars/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] })
      closeModal()
    },
  })

  const deleteCar = useMutation({
    mutationFn: async (id) => adminApi.delete(`/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] })
    },
  })

  const openCreate = () => {
    setEditingCar(null)
    setForm(emptyForm)
    setVendorSearch("")
    setIsModalOpen(true)
  }

  const openEdit = (car) => {
    setEditingCar(car)
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      model: car.model || "",
      price: car.price?.toString() || "",
      image: car.image || "",
      status: car.status || "recommended",
      rating: car.rating?.toString() || "",
      description: car.description || "",
      year: car.specs?.year || "",
      speed: car.specs?.speed || "",
      transmission: car.specs?.transmission || "",
      color: car.specs?.color || "",
      condition: car.specs?.condition || "",
      imagesCsv: Array.isArray(car.images) ? car.images.join(", ") : "",
      vendor_id: car.vendor_id || "",
    })
    setVendorSearch(car.vendor_name || car.vendor_email || "")
    setIsModalOpen(true)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = toPayload(form)
    if (editingCar) {
      updateCar.mutate({ id: editingCar._id, payload })
    } else {
      createCar.mutate(payload)
    }
  }

  return (
    <SurfaceCard>
      <SectionHeading
        title="Available Cars"
        description="Add, edit, and retire showcase vehicles while preserving a polished marketplace presentation."
        action={
          <PremiumButton onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Car
          </PremiumButton>
        }
      />

      {loading || (isFetching && !cars.length) ? (
        <TableSkeleton columns={7} rows={6} title={false} />
      ) : !cars.length ? (
        <EmptyState title="No cars available" description="Create the first listing to seed the admin inventory workspace." />
      ) : (
        <>
          <PremiumTable columns={["Name", "Brand", "Model", "Vendor", "Price", "Status", "Actions"]}>
            {cars.map((car) => (
              <PremiumTableRow key={car._id}>
                <PremiumTableCell>{car.name}</PremiumTableCell>
                <PremiumTableCell>{car.brand}</PremiumTableCell>
                <PremiumTableCell>{car.model}</PremiumTableCell>
                <PremiumTableCell>{car.vendor_name || car.vendor_email || "Unassigned"}</PremiumTableCell>
                <PremiumTableCell>{formatCurrency(car.price)}</PremiumTableCell>
                <PremiumTableCell>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {car.status}
                  </span>
                </PremiumTableCell>
                <PremiumTableCell>
                  <div className="flex flex-wrap gap-2">
                    <PremiumButton className="px-3 py-2 text-xs" onClick={() => openEdit(car)}>
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </PremiumButton>
                    <PremiumButton
                      className="px-3 py-2 text-xs"
                      tone="danger"
                      onClick={() => {
                        if (window.confirm("Delete this car?")) deleteCar.mutate(car._id)
                      }}
                    >
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

      <PremiumDialog open={isModalOpen} onClose={closeModal} title={editingCar ? "Edit Car" : "Create Car"}>
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          {editingCar ? "Edit Car" : "Create Car"}
        </h3>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ["name", "Name"],
            ["brand", "Brand"],
            ["model", "Model"],
            ["price", "Price"],
            ["image", "Image URL"],
            ["rating", "Rating"],
            ["year", "Year"],
            ["speed", "Speed"],
            ["transmission", "Transmission"],
            ["color", "Color"],
            ["condition", "Condition"],
          ].map(([key, label]) => (
            <PremiumInput
              key={key}
              type="text"
              placeholder={label}
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              required={["name", "brand", "model", "price", "image", "year", "speed", "transmission", "color", "condition"].includes(key)}
            />
          ))}
          <PremiumSelect
            value={form.vendor_id}
            onChange={(e) => setForm((prev) => ({ ...prev, vendor_id: e.target.value }))}
          >
            <option value="">No assigned vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {(vendor.displayName || vendor.business_name || vendor.email)} ({vendor.email})
              </option>
            ))}
          </PremiumSelect>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Search vendor
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <PremiumInput
                value={vendorSearch}
                onChange={(e) => setVendorSearch(e.target.value)}
                placeholder="Search by vendor name, business name, email, or location"
                className="pl-11"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Select a vendor above. This search field filters the vendor options for easier assignment.
            </p>
          </div>
          <PremiumSelect
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="recommended">recommended</option>
            <option value="specialoffer">specialoffer</option>
            <option value="available">available</option>
          </PremiumSelect>
          <PremiumInput
            type="text"
            placeholder="Images CSV (optional)"
            value={form.imagesCsv}
            onChange={(e) => setForm((prev) => ({ ...prev, imagesCsv: e.target.value }))}
          />
          <PremiumTextarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="min-h-32 md:col-span-2"
          />
          <div className="flex justify-end gap-2 pt-2 md:col-span-2">
            <PremiumButton type="button" onClick={closeModal} tone="ghost">
              Cancel
            </PremiumButton>
            <PremiumButton
              type="submit"
              disabled={createCar.isPending || updateCar.isPending}
            >
              {createCar.isPending || updateCar.isPending ? "Saving..." : "Save"}
            </PremiumButton>
          </div>
        </form>
      </PremiumDialog>
    </SurfaceCard>
  )
}

export default AdminCars
