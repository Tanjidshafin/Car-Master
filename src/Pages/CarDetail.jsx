"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Phone, MessageCircle } from "lucide-react"
import { NavLink, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import BaseUrl from "../Hooks/BaseUrl"
import CarSkeleton from "../Components/CarSkeleton"

export default function CarDetails() {
    const [selectedImage, setSelectedImage] = useState(0)
    const { id } = useParams()
    const link = BaseUrl()
    const {
        data: car = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["car"],
        queryFn: async () => {
            const res = await link.get(`/car/${id}`)
            return res.data
        },
    })
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900">
            <div className="relative h-[300px] w-full">
                <img
                    src="https://autopro.jwsuperthemes.com/wp-content/uploads/2017/06/bg-tt.jpg"
                    alt="Cars Banner"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50">
                    <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Vehicles Detail
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-2 text-gray-300"
                        >
                            <NavLink to="/all-cars">
                                <span>All Cars</span>
                            </NavLink>
                            <span>/</span>
                            <NavLink to={`/car/${id}`}>
                                <span>{isFetching ? "Loading..." : car.name}</span>
                            </NavLink>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {isFetching ? (
                    <CarSkeleton />
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedImage}
                                            src={car.images[selectedImage]}
                                            alt={`${car.name} Image ${selectedImage + 1}`}
                                            className="w-full h-full object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2">
                                        <Star className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                                        {selectedImage + 1}/{car.images.length}
                                    </div>
                                </div>
                                <div className={`grid grid-cols-4 gap-2`}>
                                    {car.images.map((img, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedImage(i)}
                                            className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === i ? "ring-2 ring-orange-500" : ""
                                                }`}
                                        >
                                            <img
                                                src={img || "/placeholder.svg"}
                                                alt={`${car.name} Thumbnail ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Description</h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 lg:max-w-md"
                        >
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span>{car.specs?.year}</span>
                                    <span>•</span>
                                    <span>{car.specs?.transmission}</span>
                                    <span>•</span>
                                    <span>{car.specs?.color}</span>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-orange-500">${car.price}</div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Brand</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.brand}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Model</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.model}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Color</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.color}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Transmission</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.transmission}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Condition</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.condition}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.year}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Speed</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.speed}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                                    <div className="font-medium uppercase text-gray-900 dark:text-white">{car.status}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3 flex-col sm:flex-row items-center">
                                    <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors">
                                        <Phone className="w-5 h-5" />
                                        <span>01234567890</span>
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Chat via WhatsApp</span>
                                    </button>
                                </div>
                                <button className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg transition-colors">
                                    Send message
                                </button>
                            </div>

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {car.status === "SpecialOffer" && "Special Offer"} ID #{car._id?.slice(-6)}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </main>
    )
}

