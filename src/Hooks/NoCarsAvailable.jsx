import { motion } from "framer-motion"
import { Car } from "lucide-react"

const NoCarsAvailable = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="text-6xl text-gray-400 dark:text-gray-600 mb-4">
                <Car />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No Cars Available
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 text-center">
                We couldn't find any cars matching your criteria. Try adjusting your filters.
            </motion.p>
        </motion.div>
    )
}

export default NoCarsAvailable

