"use client"

import { motion } from "framer-motion"

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { id: "all", label: "All" },
        { id: "new", label: "New Car" },
        { id: "used", label: "Used Car" },
    ]

    return (
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {/* Animated Background */}
            <motion.div
                className="absolute h-[calc(100%-8px)] rounded-md bg-orange-500"
                initial={false}
                animate={{
                    x: categories.findIndex((cat) => cat.id === activeCategory) * 100 + "%",
                    width: `${100 / categories.length}%`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {/* Category Buttons */}
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeCategory === category.id
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    whileTap={{ scale: 0.95 }}
                >
                    {category.label}
                </motion.button>
            ))}
        </div>
    )
}

export default CategoryFilter

