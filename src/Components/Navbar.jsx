"use client"

import { useState, useEffect } from "react"
import { FaChevronDown } from "react-icons/fa6";
import { NavLink } from "react-router"
import logo from "../assets/logo.png"
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
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

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                } ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
        >
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <NavLink href="/" className="flex items-center">
                        <img src={logo} alt="Car Master" className="h-8 w-auto" />
                        <span className={`ml-2 text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>Car Master</span>
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-8">
                        {["Home", "Search", "Listing", "Pages", "More"].map((item) => (
                            <div key={item} className="relative group">
                                <button
                                    className={`flex items-center space-x-1 ${isScrolled ? "text-gray-900" : "text-white"
                                        } hover:opacity-75 transition-colors`}
                                >
                                    <span>{item}</span>
                                    <FaChevronDown className="h-4 w-4" />
                                </button>
                                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48">
                                    <NavLink href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Option 1
                                    </NavLink>
                                    <NavLink href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Option 2
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink
                            href="/login"
                            className={`${isScrolled ? "text-gray-900" : "text-white"} hover:opacity-75 transition-colors`}
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            href="/register"
                            className={`${isScrolled ? "text-gray-900" : "text-white"} hover:opacity-75 transition-colors`}
                        >
                            Register
                        </NavLink>
                        <NavLink
                            href="/add-listing"
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Add Listing
                        </NavLink>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                        <div
                            className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? "bg-gray-900" : "bg-white"
                                } ${isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}
                        />
                        <div
                            className={`w-6 h-0.5 mb-1.5 ${isScrolled ? "bg-gray-900" : "bg-white"
                                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                        />
                        <div
                            className={`w-6 h-0.5 ${isScrolled ? "bg-gray-900" : "bg-white"
                                } ${isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}
                        />
                    </button>
                </div>
                <div
                    className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden bg-white`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {["Home", "Search", "Listing", "Pages", "More"].map((item) => (
                            <NavLink key={item} href="#" className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md">
                                {item}
                            </NavLink>
                        ))}
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            <NavLink href="/login" className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md">
                                Log in
                            </NavLink>
                            <NavLink href="/register" className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md">
                                Register
                            </NavLink>
                            <NavLink href="/add-listing" className="block px-3 py-2 bg-orange-500 text-white rounded-md mt-2">
                                Add Listing
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

