"use client"

import { useContext } from "react"
import { AppContext } from "./AppContext"
import { Navigate, useLocation } from "react-router"
import { motion } from "framer-motion"

const Private = ({ children }) => {
    const { user, loading } = useContext(AppContext)
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-semibold text-gray-800 dark:text-white"
                    >
                        Loading...
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-600 dark:text-gray-300 mt-2"
                    >
                        Please wait while we prepare your experience
                    </motion.p>
                </motion.div>
            </div>
        )
    }

    if (user) {
        return children
    }

    return <Navigate to={"/register"} state={location?.pathname} />
}

export default Private

