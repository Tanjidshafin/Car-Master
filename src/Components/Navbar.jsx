"use client"

import { useState, useEffect, useContext } from "react"
import { NavLink, useLocation } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/logo.png"
import { AppContext } from "../context/AppContext"

const routes = [
    { name: "Home", path: "/" },
    { name: "All Cars", path: "/all-cars" },
]

export default function Navbar() {
    const { user } = useContext(AppContext)
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showLoginDropdown, setShowLoginDropdown] = useState(false)
    const [showMobileLogin, setShowMobileLogin] = useState(false)
    const location = useLocation()
    const [isDark, setIsDark] = useState(false)
    const [favoriteCount, setFavoriteCount] = useState(5)

    useEffect(() => setIsMobileMenuOpen(false), [location.pathname, showMobileLogin])

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light"
        setIsDark(savedTheme === "dark")
        document.documentElement.setAttribute("data-theme", savedTheme)

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && !showLoginDropdown) {
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
    }, [lastScrollY, showLoginDropdown])

    useEffect(() => {
        if (showMobileLogin) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [showMobileLogin])

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
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    }

    const favoriteIconVariants = {
        initial: { scale: 1 },
        animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
    }

    return (
        <AnimatePresence>
            {(isVisible || showLoginDropdown) && (
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`fixed top-0 w-full z-[1000] ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"}`}
                >
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <NavLink to="/" className="flex items-center">
                                    <img src={logo || "/placeholder.svg"} alt="Car Master" className="sm:h-8 h-6 w-auto" />
                                    <motion.span
                                        className={`ml-2 text-xl sm:text-2xl font-bold ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
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
                                                `before:bg-blue-500 before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] transition-all duration-300 before:left-0 cursor-pointer capitalize ${isActive ? "before:w-full font-semibold text-blue-500" : "before:w-0 hover:before:w-full"
                                                } ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`
                                            }
                                        >
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                <motion.button
                                    onClick={toggleTheme}
                                    className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-yellow-400"
                                        }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Toggle theme"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: isDark ? 180 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-6 h-6"
                                    >
                                        {isDark ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 text-gray-200"
                                            >
                                                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 text-yellow-600"
                                            >
                                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                            </svg>
                                        )}
                                    </motion.div>
                                </motion.button>

                                <motion.div className="relative" initial="initial" animate="animate" variants={favoriteIconVariants}>
                                    <NavLink
                                        to="/favorites"
                                        className="relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 bg-blue-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                        >
                                            {favoriteCount}
                                        </motion.span>
                                    </NavLink>
                                </motion.div>

                                <div className="hidden md:flex items-center space-x-4">
                                    <motion.div className="relative">
                                        <motion.button
                                            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            Login
                                        </motion.button>
                                        <AnimatePresence>
                                            {showLoginDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                                                >
                                                    <form className="space-y-4">
                                                        <div>
                                                            <label
                                                                htmlFor="email"
                                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                            >
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="password"
                                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                            >
                                                                Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                                        >
                                                            Sign In
                                                        </button>
                                                    </form>
                                                    <div className="mt-4 text-center">
                                                        <a href="/register" className="text-sm text-blue-500 hover:text-blue-600">
                                                            Don't have an account? Register
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                        <NavLink
                                            to="/register"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
                                        >
                                            Register
                                        </NavLink>
                                    </motion.div>

                                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                        <NavLink
                                            to="/add-listing"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
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
                                                    className={({ isActive }) =>
                                                        `block px-3 py-2 rounded-md transition-colors
                                                        ${isActive
                                                            ? "bg-blue-500 text-white font-semibold dark:bg-blue-600"
                                                            : "text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                                        } 
                                                        ${isScrolled ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-200"}`
                                                    }
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                <NavLink onClick={() => setShowMobileLogin(true)}
                                                    className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                >
                                                    Log in
                                                </NavLink>
                                            </motion.div>
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                <NavLink
                                                    to="/register"
                                                    className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                >
                                                    Register
                                                </NavLink>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showMobileLogin && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center p-4"
                                    onClick={() => setShowMobileLogin(false)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
                                            <button
                                                onClick={() => setShowMobileLogin(false)}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <form className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="mobile-email"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="mobile-email"
                                                    name="email"
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="mobile-password"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="mobile-password"
                                                    name="password"
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                            >
                                                Sign In
                                            </button>
                                        </form>
                                        <div className="mt-4 text-center">
                                            <a href="/register" className="text-sm text-blue-500 hover:text-blue-600">
                                                Don't have an account? Register
                                            </a>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}

