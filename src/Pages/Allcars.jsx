"use client"

import React, { useState, useEffect, useRef } from "react"
import UseCars from "../Hooks/UseCars"
import { Grid, List, SlidersHorizontal, ChevronDown, ChevronRight, Star } from "lucide-react"
import CarCardSkeleton from "../Hooks/Skeleton"
import CarCard from "../Hooks/Carcard"
import FiltersSidebar from "../Hooks/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import AllCarsBanner from "../Components/AllCarsBanner"

const Allcars = () => {
    const [Allcars, refetch, isFetching] = UseCars()
    const [isGridView, setIsGridView] = useState(true)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [sortBy, setSortBy] = useState("default")
    const [activeCategory, setActiveCategory] = useState("all")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [expandedRow, setExpandedRow] = useState(null)
    const dropdownRef = useRef(null)

    const categories = ["All", "Sedan", "SUV", "Truck", "Sports Car", "Electric"]

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

    return (
        <div className="">
            <AllCarsBanner />
            <div className="max-w-screen-xl mx-auto ">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Listings</h1>
                            <p className="text-gray-600 dark:text-gray-400">There are currently {Allcars.length} results</p>
                        </div>

                        {/* Animated Dropdown */}
                        <div className="relative w-full sm:w-64" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex items-center justify-between"
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
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow">
                                <button
                                    onClick={() => setIsGridView(true)}
                                    className={`p-2 rounded ${isGridView
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsGridView(false)}
                                    className={`p-2 rounded ${!isGridView
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                            >
                                <option value="default">Sort by (Default)</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="year-desc">Year: Newest</option>
                                <option value="year-asc">Year: Oldest</option>
                            </select>

                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="md:hidden bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition-colors"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex gap-6">
                        {/* Filters Sidebar - Desktop */}
                        <div className="hidden md:block">
                            <FiltersSidebar isOpen={true} onClose={() => { }} onFilter={() => { }} />
                        </div>

                        {/* Allcars Grid or List */}
                        {isGridView ? (
                            <div className="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {isFetching
                                    ? Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
                                    : Allcars.map((car) => <CarCard key={car.id} car={car} />)}
                            </div>
                        ) : (
                            <div className="flex-1 overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="p-2 text-left">Image</th>
                                            <th className="p-2 text-left">Name</th>
                                            <th className="p-2 text-left">Brand</th>
                                            <th className="p-2 text-left">Price</th>
                                            <th className="p-2 text-left">Rating</th>
                                            <th className="p-2 text-left">Status</th>
                                            <th className="p-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isFetching
                                            ? Array.from({ length: 6 }).map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td colSpan="7" className="p-2">
                                                        <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                    </td>
                                                </tr>
                                            ))
                                            : Allcars.map((car) => (
                                                <React.Fragment key={car.id}>
                                                    <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                        <td className="p-2">
                                                            <img
                                                                src={car.image || "/placeholder.svg"}
                                                                alt={car.name}
                                                                width={80}
                                                                height={60}
                                                                className="object-cover rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2">{car.name}</td>
                                                        <td className="p-2">{car.brand}</td>
                                                        <td className="p-2">${car.price.toLocaleString()}</td>
                                                        <td className="p-2">
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
                                                        <td className="p-2">
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${car.status === "recommended"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-blue-100 text-blue-800"
                                                                    }`}
                                                            >
                                                                {car.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-2">
                                                            <button
                                                                onClick={() => toggleRowExpansion(car.id)}
                                                                className="text-orange-500 hover:text-orange-600 transition-colors"
                                                            >
                                                                <ChevronRight
                                                                    className={`w-5 h-5 transition-transform duration-300 ${expandedRow === car.id ? "rotate-90" : ""}`}
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <AnimatePresence>
                                                        {expandedRow === car.id && (
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
                    </div>
                </div>
            </div>

            {/* Filters Sidebar - Mobile */}
            <FiltersSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onFilter={() => {
                    // Apply filters
                    setIsFilterOpen(false)
                }}
            />
        </div>
    )
}

export default Allcars

