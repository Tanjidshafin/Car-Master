"use client"

import { motion } from "framer-motion"
import { Heart, Share2 } from "lucide-react"

const CarCard = ({ car }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <motion.div
                className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover="hover"
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />

                    {/* Hover Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0"
                        variants={{
                            hover: {
                                opacity: 1,
                            },
                        }}
                    >
                        <motion.button
                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className="w-6 h-6 text-gray-700" />
                        </motion.button>
                        <motion.button
                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Share2 className="w-6 h-6 text-gray-700" />
                        </motion.button>
                    </motion.div>

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {car.status === "recommended" && (
                            <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full">Featured</span>
                        )}
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-full">
                            {car.specs.year}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <span className="text-orange-500 font-medium">{car.specs.condition}</span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{car.name}</h3>

                    <div className="flex gap-4 mt-3 text-gray-600 dark:text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                            <span className="w-4 h-4">🛣️</span>
                            {car.specs.speed}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-4 h-4">⛽</span>
                            {car.specs.transmission}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-4 h-4">🎨</span>
                            {car.specs.color}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-500">${car.price.toLocaleString()}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Seller Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Seller Name</span>
                        </div>
                        <button className="px-4 py-2 rounded-full border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors">
                            View Car
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CarCard

