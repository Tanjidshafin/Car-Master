"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

const cars = [
    {
        id: 1,
        name: "Porsche Cayenne",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/02/cayenman5.png",
        price: 75000.0,
        rating: 4,
        description: "The Porsche Cayenne is a luxury midsize SUV offering powerful performance, premium interiors, and advanced technology features.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Automatic",
            color: "White",
            speed: "165 mph",
        },
    },
    {
        id: 2,
        name: "Porsche 911",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/porsche-one.png",
        price: 92000.0,
        rating: 5,
        description: "The Porsche 911 is an iconic sports car known for its sleek design, exhilarating performance, and precision engineering.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Manual",
            color: "Blue",
            speed: "190 mph",
        },
    },
    {
        id: 3,
        name: "Porsche Panamera",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/02/paramela1.png",
        price: 67000.0,
        rating: 4,
        description: "The Porsche Panamera combines sports car performance with the comfort and luxury of a premium sedan, making it a unique offering in its class.",
        specs: {
            condition: "Used",
            year: "2019",
            transmission: "Automatic",
            color: "Black",
            speed: "155 mph",
        },
    },
    {
        id: 4,
        name: "Porsche Macan",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/02/macan3.png",
        price: 80000.0,
        rating: 5,
        description: "A compact luxury SUV that blends sporty performance with daily usability, offering a thrilling yet practical drive.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Automatic",
            color: "Red",
            speed: "175 mph",
        },
    },
    {
        id: 5,
        name: "Jaguar XE",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/xe1.png",
        price: 73000.0,
        rating: 4,
        description: "A premium sports sedan that delivers a refined driving experience with powerful engine options and elegant styling.",
        specs: {
            condition: "New",
            year: "2022",
            transmission: "Manual",
            color: "Silver",
            speed: "160 mph",
        },
    },
    {
        id: 6,
        name: "Tesla Model X",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/vehicle-two.png",
        price: 85000.0,
        rating: 5,
        description: "A high-performance electric SUV offering cutting-edge technology, exceptional acceleration, and long-range capabilities.",
        specs: {
            condition: "Used",
            year: "2021",
            transmission: "Automatic",
            color: "Gray",
            speed: "170 mph",
        },
    },
    {
        id: 7,
        name: "Porsche Macan GTS",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/macan1.png",
        price: 81000.0,
        rating: 4,
        description: "A performance-focused version of the Macan, featuring enhanced handling, a sportier design, and a thrilling drive experience.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Automatic",
            color: "Green",
            speed: "180 mph",
        },
    },
    {
        id: 8,
        name: "Jaguar XE SV Project 8",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/02/cayenne1.png",
        price: 74000.0,
        rating: 4,
        description: "A track-ready version of the Jaguar XE with extreme performance upgrades and an aggressive design.",
        specs: {
            condition: "Used",
            year: "2020",
            transmission: "Manual",
            color: "Yellow",
            speed: "165 mph",
        },
    },
    {
        id: 9,
        name: "Porsche Panamera Turbo",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/PANAMERA1.png",
        price: 110000.0,
        rating: 5,
        description: "A luxury high-performance sedan combining speed, technology, and comfort for an exhilarating drive.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Automatic",
            color: "Black",
            speed: "196 mph",
        },
    },
    {
        id: 10,
        name: "Porsche Taycan Turbo S",
        image: "https://autopro.jwsuperthemes.com/wp-content/uploads/2017/01/car-1.png",
        price: 150000.0,
        rating: 5,
        description: "Porsche's fully electric sports car, delivering breathtaking acceleration and cutting-edge electric technology.",
        specs: {
            condition: "New",
            year: "2023",
            transmission: "Automatic",
            color: "White",
            speed: "200 mph",
        },
    },
];



export default function SpecialOffers() {
    const [selectedCarIndex, setSelectedCarIndex] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const carouselRef = useRef(null)
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const moveCarousel = (direction) => {
        if (direction === "left") {
            setSelectedCarIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length)
            if (selectedCarIndex === startIndex) {
                setStartIndex((prevStart) => (prevStart - 1 + cars.length) % cars.length)
            }
        } else {
            setSelectedCarIndex((prevIndex) => (prevIndex + 1) % cars.length)
            if (selectedCarIndex === (startIndex + getVisibleCars() - 1) % cars.length) {
                setStartIndex((prevStart) => (prevStart + 1) % cars.length)
            }
        }
    }

    const selectCar = (index) => {
        setSelectedCarIndex(index)
    }

    const getVisibleCars = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 1024) return 6
            if (window.innerWidth >= 768) return 4
            if (window.innerWidth >= 640) return 3
            return 2
        }
        return 6
    }

    useEffect(() => {
        const handleResize = () => {
            const visibleCars = getVisibleCars()
            if (selectedCarIndex < startIndex || selectedCarIndex >= startIndex + visibleCars) {
                setStartIndex(Math.max(0, Math.min(selectedCarIndex, cars.length - visibleCars)))
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [selectedCarIndex, startIndex, getVisibleCars])

    const visibleCars = getVisibleCars()
    const displayedCars = [...Array(visibleCars)].map((_, index) => cars[(startIndex + index) % cars.length])

    return (
        <section className="py-16 mt-40 px-4 md:py-24 bg-white dark:bg-gray-900">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 mb-2 tracking-wider"
                    >
                        MOST WANTED ITEM
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                        SPECIAL OFFERS
                    </motion.h2>
                </div>
                <div className="relative mb-20">
                    <button
                        onClick={() => moveCarousel("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div ref={carouselRef} className="overflow-hidden">
                        <AnimatePresence initial={false}>
                            <motion.div
                                className="flex justify-center items-center gap-4 py-4"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {displayedCars.map((car, index) => (
                                    <motion.div
                                        key={car.id}
                                        className={`cursor-pointer flex-shrink-0`}
                                        onClick={() => selectCar((startIndex + index) % cars.length)}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-32 h-24 relative">
                                            <img
                                                src={car.image || "/placeholder.svg"}
                                                alt={car.name}
                                                className={`w-full h-full object-contain transition-all duration-300 
                                                    ${selectedCarIndex === (startIndex + index) % cars.length ? "opacity-100" : "opacity-50 hover:opacity-75"}`}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={() => moveCarousel("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto"
                >
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{cars[selectedCarIndex].name}</h3>

                        <div className="flex items-center">
                            <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < cars[selectedCarIndex].rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Buyer Rates:</span>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg text-gray-700 dark:text-gray-300">From</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${cars[selectedCarIndex].price.toLocaleString()}.00
                            </p>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{cars[selectedCarIndex].description}</p>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                            {Object.entries(cars[selectedCarIndex].specs).map(([key, value]) => (
                                <span key={key} className="flex items-center">
                                    <span className="mr-2 text-gray-400">•</span>
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        key={cars[selectedCarIndex].id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-[4/3] w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={cars[selectedCarIndex].image || "/placeholder.svg"}
                            alt={cars[selectedCarIndex].name}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

