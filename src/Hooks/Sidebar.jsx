"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp } from "lucide-react"

const FiltersSidebar = ({ isOpen, onClose, brand, color, onFilter, initialFilters }) => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFilter(filters)
  }

  const filterSections = [
    {
      title: "Make",
      content: (
        <select
          className="mt-2 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          value={filters.make}
          onChange={(e) => handleFilterChange("make", e.target.value)}
        >
          <option>All Makes</option>
          {brand.map((brands) => (
            <option key={brands}>{brands}</option>
          ))}
        </select>
      ),
    },
    {
      title: "Price Range",
      content: (
        <div className="mt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">${filters.priceRange[0]}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="250000"
            step="1000"
            className="w-full accent-blue-500"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])}
          />
        </div>
      ),
    },
    {
      title: "Year",
      content: (
        <div className="mt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{filters.year[0]}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{filters.year[1]}</span>
          </div>
          <input
            type="range"
            min="2010"
            max="2025"
            className="w-full accent-blue-500"
            value={filters.year[1]}
            onChange={(e) => handleFilterChange("year", [filters.year[0], Number.parseInt(e.target.value)])}
          />
        </div>
      ),
    },
    {
      title: "Transmission",
      content: (
        <select
          className="mt-2 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
          value={filters.transmission}
          onChange={(e) => handleFilterChange("transmission", e.target.value)}
        >
          <option>All</option>
          <option>Manual</option>
          <option>Automatic</option>
        </select>
      ),
    },
    {
      title: "Color",
      content: (
        <div className="mt-2 flex flex-wrap gap-2">
          {color.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${filters.color.includes(color) ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              style={{ backgroundColor: color }}
              onClick={() => {
                const newColors = filters.color.includes(color)
                  ? filters.color.filter((c) => c !== color)
                  : [...filters.color, color]
                handleFilterChange("color", newColors)
              }}
            />
          ))}
        </div>
      ),
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[300px] bg-white dark:bg-gray-800 p-6 overflow-y-auto z-50 md:relative md:right-auto md:top-auto md:h-auto md:w-[280px] md:rounded-lg md:shadow-lg"
          >
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {filterSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={false}
                  animate={{ height: expandedSection === index ? "auto" : "48px" }}
                  className="overflow-hidden bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between w-full p-3 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {section.title}
                    {expandedSection === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div className="p-3">{section.content}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={applyFilters}
              className="w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FiltersSidebar

