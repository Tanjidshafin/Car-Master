import { motion } from "framer-motion"
import { NavLink } from "react-router"

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">

            <img
                src="https://autopro.jwsuperthemes.com/wp-content/uploads/2017/02/404-bg.jpg"
                alt="404 Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center mb-8"
                >
                    <motion.h1 initial={{ x: -100 }} animate={{ x: 0 }} className="text-8xl font-bold text-red-600">
                        4
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-4"
                    >
                        <div className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-red-600 rounded-full" />
                        </div>
                    </motion.div>
                    <motion.h1 initial={{ x: 100 }} animate={{ x: 0 }} className="text-8xl font-bold text-red-600">
                        4
                    </motion.h1>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                    We Are Sorry, Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-400 max-w-lg mx-auto mb-8"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                    <NavLink
                        to="/"
                        className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                    >
                        GO TO HOME PAGE
                    </NavLink>
                </motion.div>
            </div>
        </div>
    )
}

export default NotFound

