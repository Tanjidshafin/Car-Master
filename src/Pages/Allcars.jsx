"use client"

import React, { useState, useEffect, useRef } from "react"
import UseCars from "../Hooks/UseCars"
import { Grid, List, SlidersHorizontal, ChevronDown, ChevronRight, Star, ChevronLeft } from "lucide-react"
import CarCardSkeleton from "../Hooks/Skeleton"
import CarCard from "../Hooks/Carcard"
import FiltersSidebar from "../Hooks/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import AllCarsBanner from "../Components/AllCarsBanner"
import NoCarsAvailable from "../Hooks/NoCarsAvailable"


const Allcars = () => {
  const [Allcars, refetch, isFetching] = UseCars()
  const [isGridView, setIsGridView] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("default")
  const [activeCategory, setActiveCategory] = useState("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [expandedRow, setExpandedRow] = useState(null)
  const dropdownRef = useRef(null)
  const categories = ["All", "Used", "New"]
  const brands = [...new Set(Allcars.map((item) => item.brand))]
  const color = [...new Set(Allcars.map(item => item.specs.color))]
  const [currentPage, setCurrentPage] = useState(1)
  const [carsPerPage] = useState(6)

  // New state for filters
  const [filters, setFilters] = useState({
    make: "All Makes",
    priceRange: [0, 250000],
    year: [2010, 2025],
    transmission: "All",
    color: [],
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
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

  const filteredCars = Allcars.filter((car) => {
    if (activeCategory !== "all" && car.specs.condition.toLowerCase() !== activeCategory) return false
    if (filters.make !== "All Makes" && car.brand !== filters.make) return false
    if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false
    if (car.specs.year < filters.year[0] || car.specs.year > filters.year[1]) return false
    if (filters.transmission !== "All" && car.specs.transmission !== filters.transmission) return false
    if (filters.color.length > 0 && !filters.color.includes(car.specs.color)) return false
    return true
  })

  const sortedCars = filteredCars.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "year-asc":
        return a.specs.year - b.specs.year
      case "year-desc":
        return b.specs.year - a.specs.year
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedCars.length / carsPerPage)
  const showPagination = sortedCars.length > 6

  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = sortedCars.slice(indexOfFirstCar, indexOfLastCar)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const Pagination = ({ carsPerPage, totalCars, paginate, currentPage }) => {
    const pageNumbers = []
    const totalPages = Math.ceil(totalCars / carsPerPage)

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }

    if (!showPagination) return null

    return (
      <nav className="mt-12 mb-8">
        <div className="flex justify-center items-center">
          <div className="bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 p-1 rounded-full shadow-lg">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-4 flex space-x-2">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${currentPage === number
                      ? "bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 text-white scale-110 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
      </nav>
    )
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <AllCarsBanner />
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Your Dream Car</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Explore our collection of {Allcars.length} premium vehicles
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center justify-center flex-wrap gap-4">
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-full transition-all duration-300 ${isGridView
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-full transition-all duration-300 ${!isGridView
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Sort by (Default)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest</option>
                  <option value="year-asc">Year: Oldest</option>
                </select>
              </div>

              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full sm:w-64" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{activeCategory}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category.toLowerCase())
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="flex gap-8">
            <motion.div variants={itemVariants} className="hidden md:block w-64 shrink-0">
              <FiltersSidebar
                brand={brands}
                color={color}
                isOpen={true}
                onClose={() => { }}
                onFilter={handleFilterChange}
                initialFilters={filters}
              />
            </motion.div>
            <motion.div variants={containerVariants} className="flex-1">
              {sortedCars.length > 0 ? (
                <>
                  {isGridView ? (
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {isFetching
                        ? Array.from({ length: 6 }).map((_, i) => (
                          <motion.div key={i} variants={itemVariants}>
                            <CarCardSkeleton />
                          </motion.div>
                        ))
                        : currentCars.map((car) => (
                          <motion.div key={car._id} variants={itemVariants}>
                            <CarCard car={car} />
                          </motion.div>
                        ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-700">
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Image
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Brand
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Rating
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {isFetching
                            ? Array.from({ length: 6 }).map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                <td colSpan="7" className="p-3">
                                  <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                </td>
                              </tr>
                            ))
                            : currentCars.map((car) => (
                              <React.Fragment key={car._id}>
                                <motion.tr
                                  variants={itemVariants}
                                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <td className="p-3">
                                    <img
                                      src={car.image || "/placeholder.svg"}
                                      alt={car.name}
                                      width={80}
                                      height={60}
                                      className="object-cover rounded-md"
                                    />
                                  </td>
                                  <td className="p-3 font-medium">{car.name}</td>
                                  <td className="p-3">{car.brand}</td>
                                  <td className="p-3 font-semibold">${car.price.toLocaleString()}</td>
                                  <td className="p-3">
                                    <div className="flex items-center">
                                      {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                          key={index}
                                          className={`w-4 h-4 ${index < car.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                            }`}
                                        />
                                      ))}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-semibold ${car.status === "recommended"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                      {car.status}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <button
                                      onClick={() => toggleRowExpansion(car._id)}
                                      className="text-blue-500 hover:text-blue-600 transition-colors focus:outline-none"
                                    >
                                      <ChevronRight
                                        className={`w-5 h-5 transition-transform duration-300 ${expandedRow === car._id ? "rotate-90" : ""
                                          }`}
                                      />
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
                                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                          <div>
                                            <h3 className="font-semibold mb-2">Description</h3>
                                            <p>{car.description}</p>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold mb-2">Specifications</h3>
                                            <ul className="space-y-1">
                                              {Object.entries(car.specs).map(([key, value]) => (
                                                <li key={key} className="flex justify-between">
                                                  <span className="font-medium">{key}:</span>
                                                  <span>{value}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </motion.div>
                                      </td>
                                    </motion.tr>
                                  )}
                                </AnimatePresence>
                              </React.Fragment>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <Pagination
                    carsPerPage={carsPerPage}
                    totalCars={sortedCars.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <NoCarsAvailable />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="block sm:hidden">
        <FiltersSidebar
          brand={brands}
          color={color}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onFilter={(newFilters) => {
            handleFilterChange(newFilters)
            setIsFilterOpen(false)
          }}
          initialFilters={filters}
        />
      </div>
    </div>
  )
}

export default Allcars

