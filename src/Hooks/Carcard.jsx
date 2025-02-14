"use client"
import { motion } from "framer-motion"
import { Heart, Share2, Star, ArrowRight } from "lucide-react"
import { IoIosSpeedometer } from "react-icons/io";
import { TbTransitionBottomFilled } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { NavLink } from "react-router";
const CarCard = ({ car }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div
        className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover="hover"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4 opacity-0"
            variants={{
              hover: {
                opacity: 1,
              },
            }}
          >
            <motion.button
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          <div className="absolute top-4 left-4 flex gap-2">
            {
              <span className="px-3 py-1 bg-blue-500 text-white uppercase text-xs font-semibold rounded-full shadow-lg">
                {car.status}
              </span>
            }
            <span className="px-3 py-1  bg-white/20 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-semibold rounded-full shadow-lg">
              {car.specs.year}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-500 font-semibold text-sm">{car.specs.condition}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">4.5</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{car.name}</h3>

          <div className="flex gap-4 mb-4 text-gray-600 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4"><IoIosSpeedometer /></span>
              {car.specs.speed}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4"><TbTransitionBottomFilled /></span>
              {car.specs.transmission}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4"><IoIosColorPalette /></span>
              {car.specs.color}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-500">${car.price.toLocaleString()}</span>
            <NavLink to={`/car/${car._id}`}>
              <motion.button
                className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </NavLink>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-600">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Seller Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white block">Seller Name</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Premium Seller</span>
            </div>
          </div>
          <motion.button
            className="text-blue-500 font-medium hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CarCard

