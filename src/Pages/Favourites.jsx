"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, Calendar, Gauge, X, Heart } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router"
import UseLiked from "../Hooks/UseLiked"
import { AppContext } from "../context/AppContext"

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0., ease: "easeOut" },
}

export default function Favourites() {
    const [favCars, refetch, isFetching] = UseLiked()
    const { user } = useContext(AppContext)
    const likedCars = favCars.filter(cars => cars.email === user.email)
    const [hoveredId, setHoveredId] = useState(null)
    const NoFavoritesComponent = () => (
        <motion.div
            className="flex flex-col items-center justify-center h-[60vh] text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Heart className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-200">No Favorites Yet</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">Start adding some amazing cars to your favorites!</p>
            <NavLink to="/all-cars">
                <motion.button
                    className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore Cars
                </motion.button>
            </NavLink>
        </motion.div>
    )

    const SkeletonLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                        <div className="flex justify-between">
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/3" />
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://static.carthrottle.com/workspace/uploads/memes/mclaren_p1_ferrari_laferrari_9-54f9a60b9289a.jpg"
                    alt="Luxury Cars"
                    className="absolute w-full h-full object-cover"
                    style={{ filter: "brightness(0.6)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
                <div className="relative z-10 text-center text-white p-6">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        My Favorites
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        A curated collection of the most extraordinary vehicles that have captured my heart
                    </motion.p>
                </div>
            </div>

            <motion.div className="max-w-7xl mx-auto px-4 py-16" variants={stagger}>
                {isFetching ? (
                    <SkeletonLoader />
                ) : likedCars.length === 0 ? (
                    <NoFavoritesComponent />
                ) : (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger}>
                        <AnimatePresence>
                            {likedCars.map((car) => (
                                <motion.div
                                    key={car._id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    variants={fadeInUp}
                                    onHoverStart={() => setHoveredId(car._id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                >
                                    <div className="relative h-64">
                                        <motion.img whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.3 }}
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                                            {car.status}
                                        </div>
                                        <AnimatePresence>
                                            {hoveredId === car._id && (
                                                <motion.button
                                                    className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <X className="w-5 h-5" />
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <motion.div
                                        className="p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{car.name}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{car.brand}</p>
                                            </div>
                                            <div className="flex items-center">
                                                {[...Array(car.rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{car.year}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <Gauge className="w-4 h-4 mr-2" />
                                                <span>{car.speed}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <p className="text-2xl font-bold text-primary dark:text-white">${car.price.toLocaleString()}</p>
                                            <motion.button
                                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

