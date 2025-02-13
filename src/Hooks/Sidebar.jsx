"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const FiltersSidebar = ({ isOpen, onClose, onFilter }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed right-0 top-0 h-full w-[300px] bg-white dark:bg-gray-800 p-6 overflow-y-auto z-50 md:relative md:right-auto md:top-auto md:h-auto md:w-[280px] md:rounded-lg md:shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-6 md:hidden">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters and Sort</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Make */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Make</label>
                                <select className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                                    <option>All Makes</option>
                                    <option>Jaguar</option>
                                    <option>BMW</option>
                                    <option>Audi</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Price Range</label>
                                <div className="mt-2">
                                    <input type="range" min="0" max="250000" className="w-full accent-orange-500" />
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>$0</span>
                                        <span>$250,000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Year Range */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Year</label>
                                <div className="mt-2">
                                    <input type="range" min="2010" max="2025" className="w-full accent-orange-500" />
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>2010</span>
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>

                            {/* Transmission */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Transmission</label>
                                <select className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                                    <option>All</option>
                                    <option>Manual</option>
                                    <option>Automatic</option>
                                </select>
                            </div>

                            {/* Color */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Color</label>
                                <select className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-orange-500">
                                    <option>All Colors</option>
                                    <option>Silver</option>
                                    <option>Black</option>
                                    <option>White</option>
                                </select>
                            </div>

                            {/* Apply Filters Button */}
                            <button
                                onClick={onFilter}
                                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default FiltersSidebar

