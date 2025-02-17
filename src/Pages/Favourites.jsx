"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, Calendar, Gauge, X, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { NavLink } from "react-router"
import UseLiked from "../Hooks/UseLiked"
import BaseUrl from "../Hooks/BaseUrl"
import Swal from "sweetalert2"


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
    transition: { duration: 0.5, ease: "easeOut" },
}

export default function Favourites() {
    const [favCars, refetch, isFetching] = UseLiked()
    const [hoveredId, setHoveredId] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [loading, setLoading] = useState(false)
    const link = BaseUrl()
    useEffect(() => {
        setIsVisible(true)
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

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
        <motion.div
            className="min-h-screen bg-white dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative h-[60vh] flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
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
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        My Favorites
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        A curated collection of the most extraordinary vehicles that have captured my heart
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                className="max-w-7xl mx-auto px-4 py-16"
                variants={stagger}
                initial="initial"
                animate={isVisible ? "animate" : "initial"}
            >
                {isFetching ? (
                    <SkeletonLoader />
                ) : favCars.length === 0 ? (
                    <NoFavoritesComponent />
                ) : (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger}>
                        <AnimatePresence>
                            {favCars.map((car) => (
                                <motion.div
                                    key={car._id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all "
                                    variants={fadeInUp}
                                    layout
                                    onHoverStart={() => !isMobile && setHoveredId(car._id)}
                                    onHoverEnd={() => !isMobile && setHoveredId(null)}
                                    onTouchStart={() => isMobile && setHoveredId(car._id)}
                                    onTouchEnd={() => isMobile && setHoveredId(null)}
                                >
                                    <div className="relative h-64">
                                        <motion.img
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.3 }}
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 uppercase py-1 rounded-full text-sm font-semibold">
                                            {car.status}
                                        </div>
                                        <AnimatePresence>
                                            {hoveredId === car._id && (
                                                <motion.button
                                                    className="absolute cursor-pointer top-4 left-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    onClick={async (e) => {
                                                        e.stopPropagation()
                                                        console.log("Removing from favorites:", car._id)
                                                        try {
                                                            setLoading(true)
                                                            Swal.fire({
                                                                title: "Are you sure?",
                                                                text: "You won't be able to revert this!",
                                                                icon: "warning",
                                                                theme: "dark",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Yes, remove it!"
                                                            }).then(async (result) => {
                                                                if (result.isConfirmed) {
                                                                    await link.delete(`/delete-car/${car._id}`)
                                                                    Swal.fire({
                                                                        title: "Removed!",
                                                                        text: `${car.name} has been removed from your favourites`,
                                                                        icon: "success",
                                                                        theme: "dark",
                                                                    });
                                                                    refetch()
                                                                }
                                                            });
                                                        } catch (err) {
                                                            console.log(err);
                                                        } finally {
                                                            setLoading(false)
                                                        }
                                                    }}
                                                >
                                                    {loading ? (<span className="loading loading-spinner loading-xs"></span>) : (<X className="w-5 h-5" />)}
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
                                            <NavLink to={`/car/${car.id}`}>
                                                <motion.button
                                                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    View Details
                                                </motion.button>
                                            </NavLink>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

