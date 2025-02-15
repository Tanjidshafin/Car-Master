"use client"

import { useState, useEffect, useRef, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from "../context/AppContext"
import { updateProfile } from "firebase/auth"
import { auth } from "../../firebase.init"
import { ChevronDown, ChevronUp, Camera, Phone, Mail, User, Calendar, Clock } from "lucide-react"

export default function MyProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [expandedSection, setExpandedSection] = useState(null)
    const fileInputRef = useRef(null)
    const { user, setUser } = useContext(AppContext)
    const [userData, setUserData] = useState(user)
    const [previewImage, setPreviewImage] = useState(user.photoURL)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("image", file)

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
                method: "POST",
                body: formData,
            })
            const data = await response.json()

            if (data.success) {
                setUserData((prev) => ({
                    ...prev,
                    photoURL: data.data.url,
                }))
                setPreviewImage(data.data.url)
            }
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async () => {
        const finalData = {
            ...userData,
            phoneNumber: userData.phoneNumber || "Not provided",
        }
        try {
            setLoading(true)
            await updateProfile(auth.currentUser, {
                displayName: finalData.displayName,
                photoURL: finalData.photoURL,
            })
            setUser(finalData)
            setIsEditing(false)
        } catch (error) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col lg:flex-row">
            <div className="lg:w-5/4 h-screen relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url("https://wallpapercat.com/w/full/c/8/2/608302-3840x2160-desktop-4k-vintage-car-background.jpg")',
                        filter: "brightness(35%)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center px-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">My Profile</h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto">Your personal dashboard</p>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="lg:w-2/3 p-6 lg:p-30 flex-grow overflow-y-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-3xl mx-auto space-y-8">
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="relative group">
                            <motion.div
                                className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-900 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img src={previewImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Profile_photo_placeholder_square.svg/1024px-Profile_photo_placeholder_square.svg.png"} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                {isUploading && (
                                    <div className="absolute rounded-full inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </motion.div>
                            {isEditing && (
                                <motion.button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Camera className="text-white w-8 h-8" />
                                </motion.button>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{userData.displayName}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Member since {new Date(userData.metadata.creationTime).toLocaleDateString()}
                            </p>
                            <motion.button
                                onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
                                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200"
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : isEditing ? (
                                    "Save Changes"
                                ) : (
                                    "Edit Profile"
                                )}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Profile Information */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="p-6 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleSection("info")}
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                            {expandedSection === "info" ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </motion.div>
                        <AnimatePresence>
                            {expandedSection === "info" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6 space-y-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <User className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Display Name</p>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.displayName}
                                                    onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            ) : (
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{userData.displayName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Mail className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Phone className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={userData.phoneNumber}
                                                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    placeholder="Enter your phone number"
                                                />
                                            ) : (
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {userData.phoneNumber || "Not provided"}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="p-6 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleSection("activity")}
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                            {expandedSection === "activity" ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </motion.div>
                        <AnimatePresence>
                            {expandedSection === "activity" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6 space-y-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Clock className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Sign In</p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {new Date(userData.metadata.lastSignInTime).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Calendar className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {new Date(userData.metadata.creationTime).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

