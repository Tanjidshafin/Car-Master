"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/logo.png"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const routes = [
        { name: "Home", path: "/" },
        { name: "All Cars", path: "/all-cars" },
        { name: "Used Cars", path: "/used-cars" },
    ]

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light"
        setIsDark(savedTheme === "dark")
        document.documentElement.setAttribute("data-theme", savedTheme)

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            if (currentScrollY > window.innerHeight - 80) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const toggleTheme = () => {
        const newDarkMode = !isDark
        setIsDark(newDarkMode)
        localStorage.setItem("theme", newDarkMode ? "dark" : "light")
        document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light")
    }

    const navVariants = {
        hidden: { y: "-100%" },
        visible: { y: 0 },
    }

    const linkVariants = {
        hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
    }

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" },
        tap: { scale: 0.95 },
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`fixed top-0 w-full z-50 ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"}`}
                >
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <NavLink href="/" className="flex items-center">
                                    <img src={logo || "/placeholder.svg"} alt="Car Master" className="h-8 w-auto" />
                                    <motion.span
                                        className={`ml-2 text-2xl font-bold ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Car Master
                                    </motion.span>
                                </NavLink>
                            </motion.div>

                            <div className="hidden md:flex items-center space-x-8">
                                {routes.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        className="relative group"
                                        variants={linkVariants}
                                        whileHover="hover"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <NavLink
                                            to={`${item.path}`}
                                            className={({ isActive }) =>
                                                `before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full font-semibold text-[#3B9DF8]" : "before:w-0 hover:before:w-full"
                                                } ${isScrolled ? "text-gray-900 dark:text-white" : "text-white hover:text-[#3B9DF8]"}`
                                            }
                                        >
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                <motion.button
                                    onClick={toggleTheme}
                                    className={`p-2 rounded-full transition-colors ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"
                                        }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Toggle theme"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: isDark ? 180 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-6 h-6"
                                    >
                                        {isDark ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                />
                                            </svg>
                                        )}
                                    </motion.div>
                                </motion.button>

                                <motion.div whileHover="hover" whileTap="tap">
                                    <NavLink
                                        href="/login"
                                        className={`${isScrolled ? "text-gray-900 dark:text-white" : "text-white"
                                            } hover:opacity-75 transition-colors`}
                                    >
                                        Log in
                                    </NavLink>
                                </motion.div>
                                <motion.div whileHover="hover" whileTap="tap">
                                    <NavLink
                                        href="/register"
                                        className={`${isScrolled ? "text-gray-900 dark:text-white" : "text-white"
                                            } hover:opacity-75 transition-colors`}
                                    >
                                        Register
                                    </NavLink>
                                </motion.div>
                                <motion.div whileHover="hover" whileTap="tap">
                                    <NavLink
                                        href="/add-listing"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                                    >
                                        Add Listing
                                    </NavLink>
                                </motion.div>
                            </div>

                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div
                                    className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"
                                        } ${isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}
                                />
                                <div
                                    className={`w-6 h-0.5 mb-1.5 ${isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"} ${isMobileMenuOpen ? "opacity-0" : ""
                                        }`}
                                />
                                <div
                                    className={`w-6 h-0.5 ${isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"} ${isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                                        }`}
                                />
                            </motion.button>
                        </div>

                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
                                >
                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {routes.map((item) => (
                                            <motion.div key={item.name} variants={linkVariants} whileHover="hover">
                                                <NavLink
                                                    to={item.path}
                                                    className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                                            <motion.button
                                                onClick={toggleTheme}
                                                className="flex items-center w-full px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                <motion.div
                                                    initial={false}
                                                    animate={{ rotate: isDark ? 180 : 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="w-6 h-6 mr-2"
                                                >
                                                    {isDark ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                            />
                                                        </svg>
                                                    )}
                                                </motion.div>
                                                {isDark ? "Light Mode" : "Dark Mode"}
                                            </motion.button>
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                <NavLink
                                                    href="/login"
                                                    className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                >
                                                    Log in
                                                </NavLink>
                                            </motion.div>
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                <NavLink
                                                    href="/register"
                                                    className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                >
                                                    Register
                                                </NavLink>
                                            </motion.div>
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                <NavLink
                                                    href="/add-listing"
                                                    className="block px-3 py-2 bg-blue-500 text-white rounded-md mt-2 hover:bg-blue-400"
                                                >
                                                    Add Listing
                                                </NavLink>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}

