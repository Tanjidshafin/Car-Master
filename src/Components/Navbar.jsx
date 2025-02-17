"use client"

import { useState, useEffect, useContext } from "react"
import { NavLink, useLocation, useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/logo.png"
import { AppContext } from "../context/AppContext"
import swal from 'sweetalert';
import { signOut } from "firebase/auth"
import { auth } from "../../firebase.init"
import { Heart, PlusCircle, User } from "lucide-react"
import UseLiked from "../Hooks/UseLiked"

const routes = [
    { name: "Home", path: "/" },
    { name: "All Cars", path: "/all-cars" },
]

export default function Navbar() {
    const { user, handleLogin, favoriteCount } = useContext(AppContext)
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [favCars] = UseLiked()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showLoginDropdown, setShowLoginDropdown] = useState(false)
    const [showMobileLogin, setShowMobileLogin] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const locations = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        setIsMobileMenuOpen(false)
        setShowLoginDropdown(false)
        setShowMobileLogin(false)
        setShowProfileDropdown(false)
    }, [locations.pathname]),
        useEffect(() => {
            const savedTheme = localStorage.getItem("theme") || "light"
            setIsDark(savedTheme === "dark")
            document.documentElement.setAttribute("data-theme", savedTheme)
            const handleScroll = () => {
                const currentScrollY = window.scrollY
                if (currentScrollY > lastScrollY && !showLoginDropdown && !showProfileDropdown) {
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
        }, [lastScrollY, showLoginDropdown, showProfileDropdown])

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
    const logoutVariants = {
        initial: { rotate: 0 },
        animate: { rotate: 360, transition: { duration: 0.5 } },
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.password.value
        try {
            setLoading(true)
            await handleLogin(email, pass)
        } catch (error) {
            swal({
                title: "Something is Wrong!",
                text: `${error}`,
                icon: "error",
                button: "Ok",
            });
        } finally {
            locations.pathname === "/register" ? navigate("/") : ""
            setLoading(false)
            setShowLoginDropdown(false)
            setShowMobileLogin(false)
            setIsMobileMenuOpen(false)
        }
    }
    return (
        <AnimatePresence>
            {(isVisible || showLoginDropdown || showProfileDropdown) && (
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`fixed top-0 w-full z-[1000] ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "backdrop-blur-md"}`}
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

                            <div className="flex items-center space-x-2">
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
                                {user && (<motion.button
                                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                    className="flex md:hidden items-center"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <img
                                        src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Profile_photo_placeholder_square.svg/1024px-Profile_photo_placeholder_square.svg.png"}
                                        alt="Profile"
                                        className="w-9 h-9 cursor-pointer rounded-full object-cover"
                                    />
                                </motion.button>)}
                                <div className="hidden md:flex items-center space-x-4">
                                    {user ? (
                                        <motion.div className="relative">
                                            <motion.button
                                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                                className="flex items-center space-x-2"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                <img
                                                    src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Profile_photo_placeholder_square.svg/1024px-Profile_photo_placeholder_square.svg.png"}
                                                    alt="Profile"
                                                    className="w-10 h-10 cursor-pointer rounded-full object-cover"
                                                />
                                            </motion.button>
                                            <AnimatePresence>
                                                {showProfileDropdown && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3"
                                                    >
                                                        <NavLink
                                                            to="/favorites"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                                                        >
                                                            <Heart className="w-5 h-5" />
                                                            My Favorites
                                                            {favoriteCount > 0 && (
                                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-green-500 rounded-full">
                                                                    {favoriteCount}
                                                                </span>
                                                            )}
                                                        </NavLink>
                                                        <NavLink
                                                            to="/profile"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        >
                                                            <User className="w-5 h-5" />
                                                            My Profile
                                                        </NavLink>
                                                        <NavLink
                                                            to="/add-listing"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        >
                                                            <PlusCircle className="w-5 h-5" />
                                                            Add Listing
                                                        </NavLink>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ) : (
                                        <>
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
                                                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                                                    {loading ? (<span className="loading loading-spinner loading-sm"></span>) : ""}      {loading ? "Signing In" : "Sign In"}
                                                                </button>
                                                            </form>
                                                            <div className="mt-4 text-center">
                                                                <NavLink to="/register" className="text-sm text-blue-500 hover:text-blue-600">
                                                                    Don't have an account? Register
                                                                </NavLink>
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
                                        </>
                                    )}

                                    {user && (
                                        <motion.button
                                            onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Are you sure, you want to logout?",
                                                    icon: "warning",
                                                    dangerMode: true,
                                                })
                                                    .then(willDelete => {
                                                        if (willDelete) {
                                                            swal("Logged Out!", "You Have Been Logged Out!", "success");
                                                            signOut(auth)
                                                            setShowLoginDropdown(false)
                                                            setShowMobileLogin(false)
                                                            navigate("/")
                                                        }
                                                    });
                                            }}
                                            className="bg-red-500 text-white cursor-pointer p-2 rounded-full hover:bg-red-600 transition-colors"
                                            variants={logoutVariants}
                                            whileHover="animate"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                        </motion.button>
                                    )}
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
                                            {user ? (
                                                <>
                                                    <NavLink
                                                        to="/dashboard"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                    <NavLink
                                                        to="/favorites"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        My Favorites
                                                    </NavLink>
                                                    <NavLink
                                                        to="/profile"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        My Profile
                                                    </NavLink>
                                                    <button
                                                        onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Are you sure, you want to logout?",
                                                                icon: "warning",
                                                                dangerMode: true,
                                                            })
                                                                .then(willDelete => {
                                                                    if (willDelete) {
                                                                        swal("Logged Out!", "You Have Been Logged Out!", "success");
                                                                        signOut(auth)
                                                                    }
                                                                    setShowLoginDropdown(false)
                                                                    setShowMobileLogin(false)
                                                                    setIsMobileMenuOpen(false)
                                                                    navigate("/")
                                                                });
                                                        }}
                                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                                                    >
                                                        Log out
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                                        <NavLink
                                                            onClick={() => setShowMobileLogin(true)}
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
                                                </>
                                            )}
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
                                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                                {loading ? (<span className="loading loading-spinner loading-sm"></span>) : ""}      {loading ? "Signing In" : "Sign In"}
                                            </button>
                                        </form>
                                        <div className="mt-4 text-center">
                                            <NavLink to="/register" className="text-sm text-blue-500 hover:text-blue-600">
                                                Don't have an account? Register
                                            </NavLink>
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

