"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

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

export default function Recommended() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })

    const nextCar = () => {
        setCurrentIndex((prev) => (prev + 1) % cars.length)
    }

    const prevCar = () => {
        setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
    }

    return (
        <div className="w-full py-16 px-4 mt-32 bg-white dark:bg-gray-900" ref={containerRef}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-screen-2xl mx-auto"
            >
                <div className="text-center mb-12">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">TOP VEHICLES</p>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">RECOMMENDED VEHICLES</h2>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12 text-center"
                    >
                        <motion.p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                            From{" "}
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                                ${cars[currentIndex].price.toLocaleString()}
                            </span>
                        </motion.p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 ${index < cars[currentIndex].rating
                                            ? "text-yellow-400"
                                            : "text-gray-300 dark:text-gray-600"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Buyer Rates:</span>
                        </div>

                        <motion.h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {cars[currentIndex].name}
                        </motion.h3>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            {Object.entries(cars[currentIndex].specs).map(([key, value]) => (
                                <span key={key} className="flex items-center">
                                    <span className="mr-2">•</span>
                                    {value}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="relative mt-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        {[-1, 0, 1].map((offset) => {
                            const index = (currentIndex + offset + cars.length) % cars.length
                            return (
                                <motion.div
                                    key={index}
                                    className={`relative w-full sm:w-2/3 md:w-1/3 cursor-pointer ${offset === 0 ? "z-10" : "opacity-50"}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: offset === 0 ? 1 : 0.5,
                                        scale: offset === 0 ? 1 : 0.8,
                                    }}
                                    transition={{ duration: 0.8 }}
                                    onClick={() => (offset === -1 ? prevCar() : offset === 1 ? nextCar() : null)}
                                >
                                    <img
                                        src={cars[index].image || "/placeholder.svg"}
                                        alt={cars[index].name}
                                        className="w-full h-auto rounded-lg"
                                    />
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {cars.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${currentIndex === index ? "bg-gray-900 dark:bg-white" : "bg-gray-300 dark:bg-gray-700"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

