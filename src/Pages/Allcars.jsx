"use client"

import React, { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import { Grid, List, SlidersHorizontal, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import UseCars from "../Hooks/UseCars"
import UseCarsMeta from "../Hooks/UseCarsMeta"
import CarCardSkeleton from "../Hooks/Skeleton"
import CarCard from "../Hooks/Carcard"
import FiltersSidebar from "../Hooks/Sidebar"
import AllCarsBanner from "../Components/AllCarsBanner"
import NoCarsAvailable from "../Hooks/NoCarsAvailable"
import Pagination from "../Components/shared/Pagination"

const CARS_PER_PAGE = 6
const DEFAULT_SORT = "default"
const DEFAULT_VIEW = "grid"
const VALID_SORTS = new Set([DEFAULT_SORT, "price-asc", "price-desc", "year-desc", "year-asc"])
const EMPTY_FILTERS = {
  q: "",
  brand: "",
  model: "",
  condition: "",
  transmission: "",
  fuel_type: "",
  location: "",
  colors: [],
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
}

const parsePositiveInt = (value, fallback = 1) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const parseCsvParam = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

const getCatalogStateFromParams = (searchParams) => {
  const sortBy = searchParams.get("sortBy") || DEFAULT_SORT
  const view = searchParams.get("view") === "list" ? "list" : DEFAULT_VIEW

  return {
    page: parsePositiveInt(searchParams.get("page"), 1),
    sortBy: VALID_SORTS.has(sortBy) ? sortBy : DEFAULT_SORT,
    view,
    q: searchParams.get("q") || "",
    brand: searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    condition: searchParams.get("condition") || "",
    transmission: searchParams.get("transmission") || "",
    fuel_type: searchParams.get("fuel_type") || "",
    location: searchParams.get("location") || "",
    colors: parseCsvParam(searchParams.get("colors")),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minYear: searchParams.get("minYear") || "",
    maxYear: searchParams.get("maxYear") || "",
  }
}

const buildSearchParamsFromState = (state) => {
  const params = new URLSearchParams()

  if (state.page > 1) params.set("page", String(state.page))
  if (state.sortBy && state.sortBy !== DEFAULT_SORT) params.set("sortBy", state.sortBy)
  if (state.view && state.view !== DEFAULT_VIEW) params.set("view", state.view)
  if (state.q) params.set("q", state.q)
  if (state.brand) params.set("brand", state.brand)
  if (state.model) params.set("model", state.model)
  if (state.condition) params.set("condition", state.condition)
  if (state.transmission) params.set("transmission", state.transmission)
  if (state.fuel_type) params.set("fuel_type", state.fuel_type)
  if (state.location) params.set("location", state.location)
  if (state.colors.length) params.set("colors", state.colors.join(","))
  if (state.minPrice) params.set("minPrice", state.minPrice)
  if (state.maxPrice) params.set("maxPrice", state.maxPrice)
  if (state.minYear) params.set("minYear", state.minYear)
  if (state.maxYear) params.set("maxYear", state.maxYear)

  return params
}

const countActiveFilters = (state) => {
  let count = 0

  if (state.q) count += 1
  if (state.brand) count += 1
  if (state.model) count += 1
  if (state.condition) count += 1
  if (state.transmission) count += 1
  if (state.fuel_type) count += 1
  if (state.location) count += 1
  if (state.colors.length) count += 1
  if (state.minPrice || state.maxPrice) count += 1
  if (state.minYear || state.maxYear) count += 1

  return count
}

const Allcars = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [expandedRow, setExpandedRow] = useState(null)
  const catalogState = useMemo(() => getCatalogStateFromParams(searchParams), [searchParams])
  const isGridView = catalogState.view !== "list"

  const queryParams = useMemo(() => {
    const params = {
      page: catalogState.page,
      limit: CARS_PER_PAGE,
      sortBy: catalogState.sortBy,
    }

    if (catalogState.q) params.q = catalogState.q
    if (catalogState.brand) params.brand = catalogState.brand
    if (catalogState.model) params.model = catalogState.model
    if (catalogState.condition) params.condition = catalogState.condition
    if (catalogState.transmission) params.transmission = catalogState.transmission
    if (catalogState.fuel_type) params.fuel_type = catalogState.fuel_type
    if (catalogState.location) params.location = catalogState.location
    if (catalogState.colors.length) params.colors = catalogState.colors.join(",")
    if (catalogState.minPrice) params.minPrice = catalogState.minPrice
    if (catalogState.maxPrice) params.maxPrice = catalogState.maxPrice
    if (catalogState.minYear) params.minYear = catalogState.minYear
    if (catalogState.maxYear) params.maxYear = catalogState.maxYear

    return params
  }, [catalogState])

  const [allCars, , isFetching, carsResponse] = UseCars(queryParams)
  const [carsMeta, isMetaFetching] = UseCarsMeta()
  const totalCars = carsResponse?.total || 0
  const totalPages = carsResponse?.totalPages || 1
  const showPagination = totalPages > 1
  const activeFilterCount = countActiveFilters(catalogState)

  const updateCatalogState = (patch, { resetPage = false } = {}) => {
    const nextState = {
      ...catalogState,
      ...patch,
    }

    if (resetPage) {
      nextState.page = 1
    }

    setSearchParams(buildSearchParamsFromState(nextState))
  }

  const handleFilterApply = (nextFilters) => {
    updateCatalogState(nextFilters, { resetPage: true })
    setIsFilterOpen(false)
  }

  const handleFilterReset = () => {
    updateCatalogState(EMPTY_FILTERS, { resetPage: true })
    setIsFilterOpen(false)
  }

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AllCarsBanner />
      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants} className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Your Dream Car</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore {totalCars} approved vehicles with backend-powered filters, sharable URLs, and reliable sorting.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
              <span>{activeFilterCount} active filters</span>
              {isMetaFetching ? <span className="text-xs text-slate-400">Updating options...</span> : null}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => updateCatalogState({ view: "grid" })}
                  className={`rounded-full p-2 transition-all duration-300 ${isGridView ? "bg-blue-500 text-white shadow-lg" : "text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-slate-700"}`}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => updateCatalogState({ view: "list" })}
                  className={`rounded-full p-2 transition-all duration-300 ${!isGridView ? "bg-blue-500 text-white shadow-lg" : "text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-slate-700"}`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <select
                value={catalogState.sortBy}
                onChange={(event) => updateCatalogState({ sortBy: event.target.value }, { resetPage: true })}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="default">Sort by newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
                <option value="year-asc">Year: Oldest</option>
              </select>

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400">
              Page {catalogState.page} of {totalPages}
            </div>
          </motion.div>

          <div className="flex gap-8">
            <motion.div variants={itemVariants} className="hidden w-80 shrink-0 md:block">
              <FiltersSidebar
                meta={carsMeta}
                isOpen={true}
                onClose={() => {}}
                filters={catalogState}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
              />
            </motion.div>

            <motion.div variants={containerVariants} className="flex-1">
              {isFetching || allCars.length > 0 ? (
                <>
                  {isGridView ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                      {isFetching
                        ? Array.from({ length: CARS_PER_PAGE }).map((_, index) => (
                            <motion.div key={index} variants={itemVariants}>
                              <CarCardSkeleton />
                            </motion.div>
                          ))
                        : allCars.map((car) => (
                            <motion.div key={car._id} variants={itemVariants}>
                              <CarCard car={car} />
                            </motion.div>
                          ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-lg bg-white shadow-lg dark:bg-gray-800">
                      <motion.table className="w-full border-collapse" variants={tableVariants} initial="hidden" animate="visible">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                            <th className="hidden p-3 text-left text-xs font-medium uppercase tracking-wider sm:table-cell">Name</th>
                            <th className="hidden p-3 text-left text-xs font-medium uppercase tracking-wider md:table-cell">Brand</th>
                            <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                            <th className="hidden p-3 text-left text-xs font-medium uppercase tracking-wider lg:table-cell">Rating</th>
                            <th className="hidden p-3 text-left text-xs font-medium uppercase tracking-wider sm:table-cell">Status</th>
                            <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isFetching
                            ? Array.from({ length: CARS_PER_PAGE }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                  <td colSpan="7" className="p-3">
                                    <div className="h-16 rounded bg-gray-200 dark:bg-gray-600" />
                                  </td>
                                </tr>
                              ))
                            : allCars.map((car) => (
                                <React.Fragment key={car._id}>
                                  <motion.tr
                                    variants={rowVariants}
                                    className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                  >
                                    <td className="p-3">
                                      <img
                                        src={car.image || "/placeholder.svg"}
                                        alt={car.name}
                                        className="aspect-[9/14] h-16 w-20 rounded-md object-contain shadow-md transition-transform duration-700 hover:scale-110"
                                      />
                                    </td>
                                    <td className="hidden p-3 font-medium text-gray-800 dark:text-gray-200 sm:table-cell">{car.name}</td>
                                    <td className="hidden p-3 text-gray-600 dark:text-gray-400 md:table-cell">{car.brand}</td>
                                    <td className="p-3 font-semibold text-green-600 dark:text-green-400">${car.price.toLocaleString()}</td>
                                    <td className="hidden p-3 lg:table-cell">
                                      <div className="flex items-center">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                          <Star
                                            key={index}
                                            className={`h-4 w-4 ${index < car.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                                          />
                                        ))}
                                      </div>
                                    </td>
                                    <td className="hidden p-3 sm:table-cell">
                                      <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                                          car.status === "recommended"
                                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                        }`}
                                      >
                                        {car.status}
                                      </span>
                                    </td>
                                    <td className="p-3">
                                      <button
                                        type="button"
                                        onClick={() => toggleRowExpansion(car._id)}
                                        className="text-blue-500 transition-colors hover:text-blue-600 focus:outline-none"
                                      >
                                        {expandedRow === car._id ? "Hide" : "View"}
                                      </button>
                                    </td>
                                  </motion.tr>
                                  <AnimatePresence>
                                    {expandedRow === car._id && (
                                      <motion.tr
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-50 dark:bg-gray-800"
                                      >
                                        <td colSpan="7" className="p-4">
                                          <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="grid grid-cols-1 gap-4 md:grid-cols-2"
                                          >
                                            <div className="mb-4 sm:hidden">
                                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{car.name}</h3>
                                              <p className="text-gray-600 dark:text-gray-400">{car.brand}</p>
                                            </div>
                                            <div>
                                              <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Description</h3>
                                              <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
                                            </div>
                                            <div>
                                              <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Specifications</h3>
                                              <ul className="space-y-1">
                                                {Object.entries(car.specs || {}).map(([key, value]) => (
                                                  <li key={key} className="flex justify-between text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">{key}:</span>
                                                    <span>{value}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div className="sm:hidden">
                                              <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Rating</h3>
                                              <div className="flex items-center">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                  <Star
                                                    key={index}
                                                    className={`h-5 w-5 ${index < car.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                            <div className="sm:hidden">
                                              <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Status</h3>
                                              <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                  car.status === "recommended"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                                }`}
                                              >
                                                {car.status}
                                              </span>
                                            </div>
                                          </motion.div>
                                        </td>
                                      </motion.tr>
                                    )}
                                  </AnimatePresence>
                                </React.Fragment>
                              ))}
                        </tbody>
                      </motion.table>
                    </div>
                  )}

                  {showPagination ? (
                    <Pagination
                      currentPage={catalogState.page}
                      totalPages={totalPages}
                      onPageChange={(pageNumber) => updateCatalogState({ page: pageNumber })}
                    />
                  ) : null}
                </>
              ) : (
                <NoCarsAvailable />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="md:hidden">
        <FiltersSidebar
          meta={carsMeta}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={catalogState}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
        />
      </div>
    </div>
  )
}

export default Allcars
