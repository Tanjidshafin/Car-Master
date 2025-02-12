"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
    {
        images: "https://wallpapercat.com/w/full/1/4/2/607660-3840x2160-desktop-4k-sports-car-background-photo.jpg",
        title: "Welcome to",
        subtitle: "Car Master",
    },
    {
        images: "https://wallpapers.com/images/hd/best-cars-background-ce8nni4v14vzluck.jpg",
        title: "Find Your",
        subtitle: "Perfect Vehicle",
    },
    {
        images:
            "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2024/wallpaper/m-wallpaper/3-0-csl/bmw-3-0-csl-mi-05.jpg",
        title: "Get In",
        subtitle: "Fixed Prices",
    },
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [nextSlide])

    return (
        <div className="relative h-screen max-w-screen-2xl  mx-auto overflow-hidden">
            <AnimatePresence initial={false}>
                {slides.map(
                    (slide, index) =>
                        currentSlide === index && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.images})` }}
                                >
                                    <div className="absolute inset-0 bg-black opacity-40" />
                                </div>
                                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="h-full flex flex-col justify-center">
                                        <div className="max-w-3xl">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
                                            >
                                                {slide.title}
                                            </motion.h2>
                                            <motion.h1
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8"
                                            >
                                                {slide.subtitle}
                                            </motion.h1>
                                            <motion.button
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6, duration: 0.5 }}
                                                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg 
                                            hover:bg-blue-500 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                View Inventory
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ),
                )}
            </AnimatePresence>
            <motion.button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 
                text-white hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 
                text-white hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronRight className="h-6 w-6" />
            </motion.button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-white/50"}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    />
                ))}
            </div>
        </div>
    )
}

