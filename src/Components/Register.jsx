"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserCircle } from "lucide-react"
import { Check } from 'lucide-react';
import axios from "axios"
import logo from "../assets/logo.png"
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userImage: null,
        imagePreview: null,
        receiveEmails: false,
    })
    const [receiveEmails, setReceiveEmails] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkMode])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                imagePreview: URL.createObjectURL(file),
            }))

            const imgData = new FormData()
            imgData.append("image", file)

            try {
                const response = await axios.post("https://api.imgbb.com/1/upload", imgData, {
                    params: {
                        key: "99529ffa59ce8d4ba3f6fe5adb904935",
                    },
                })
                setFormData((prev) => ({
                    ...prev,
                    userImage: response.data.data.url,
                }))
            } catch (error) {
                console.error("Error uploading image:", error)
                showNotification("Error uploading image. Please try again.", "error")
            }
        }
    }

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 5000)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            showNotification("Passwords do not match!", "error")
            return
        }
        if (!formData.receiveEmails) {
            showNotification("Read Terms & Conditions First!", "error")
            return
        }
        showNotification("Registration successful!", "success")
    }

    const inputClasses =
        "w-full bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
    const labelClasses =
        "absolute left-3 -top-2.5 bg-white dark:bg-gray-800 px-1 text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 ease-in-out"

    return (
        <div className={`min-h-screen flex flex-col md:flex-row ${darkMode ? "dark" : ""}`}>

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 relative overflow-hidden bg-gray-100 dark:bg-gray-900"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/originals/2f/ff/b1/2fffb1e2c379814b5cb54ae1c173230e.jpg')",
                        filter: "brightness(0.7)",
                    }}
                />
                <div className="relative z-10 p-8 py-20 md:p-20 h-full flex flex-col gap-10 md:gap-0 justify-between">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white"
                    >
                        <h1 className="md:text-4xl text-2xl sm:text-3xl  font-bold mb-4">Join Our Community</h1>
                        <p className="md:text-xl sm:text-lg">Experience the thrill of luxury cars</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <img src={logo} className="h-9" alt="" />
                        <div>
                            <h2 className="text-white font-bold text-xl">CarMaster</h2>
                            <p className="text-gray-300">Premium Auto Experience</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-12 flex items-center"
            >
                <div className="w-full max-w-md mx-auto space-y-8">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-32 h-32 mb-4">
                            {formData.imagePreview ? (
                                <img
                                    src={formData.imagePreview || "/placeholder.svg"}
                                    alt="Profile Preview"
                                    className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                    <UserCircle className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                                </div>
                            )}
                            <label
                                htmlFor="userImage"
                                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <input
                                    type="file"
                                    id="userImage"
                                    name="userImage"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={inputClasses}

                                    required
                                />
                                <label className={labelClasses}>First Name</label>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={inputClasses}

                                    required
                                />
                                <label className={labelClasses}>Last Name</label>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="relative"
                        >
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={inputClasses}

                                required
                            />
                            <label className={labelClasses}>Email</label>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="relative"
                            >
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={inputClasses}

                                    required
                                />
                                <label className={labelClasses}>Password</label>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="relative"
                            >
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={inputClasses}

                                    required
                                />
                                <label className={labelClasses}>Confirm Password</label>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-start space-x-3"
                        >
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="receiveEmails"
                                    id="receiveEmails"
                                    checked={formData.receiveEmails}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                <motion.div
                                    className={`w-6 h-6 border-2 rounded-md cursor-pointer flex items-center justify-center ${formData.receiveEmails ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const newValue = !formData.receiveEmails
                                        handleInputChange({
                                            target: {
                                                name: "receiveEmails",
                                                type: "checkbox",
                                                checked: newValue,
                                            },
                                        })
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: formData.receiveEmails ? 1 : 0,
                                            scale: formData.receiveEmails ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Check className="w-4 h-4 text-white" />
                                    </motion.div>
                                </motion.div>
                            </div>
                            <label
                                htmlFor="receiveEmails"
                                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none pt-0.5"
                            >
                                I have read the terms and conditions and follow the terms and conditions.
                            </label>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="space-y-4"
                        >
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-700 transform hover:scale-105"
                            >
                                Create an account
                            </button>
                            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                                Already have an account?{" "}
                                <a href="/login" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
                                    Log in
                                </a>
                            </p>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className={`fixed top-20 z-[1000] right-4 p-4 rounded-lg shadow-lg ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                            } text-white`}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Register

