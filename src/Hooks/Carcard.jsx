"use client"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Star, ArrowRight, AlertCircle } from "lucide-react"
import { IoIosSpeedometer } from "react-icons/io"
import { TbTransitionBottomFilled } from "react-icons/tb"
import { IoIosColorPalette } from "react-icons/io"
import { NavLink } from "react-router"
import UseLiked from "./UseLiked"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import BaseUrl from "./BaseUrl"

const CarCard = ({ car }) => {
  const [favCars, refetch, isFetching] = UseLiked()
  const likedCar = favCars.find((cars) => cars.id === car._id) || { liked: [] }
  const link = BaseUrl()
  const { user, setFavCount } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [isVisibleNoti, setNoti] = useState(false)
  const { _id, name, image, status, price, specs } = car
  const { condition, year, speed, transmission, color } = specs
  const handleLiked = async () => {
    try {
      setLoading(true);
      if (!user) {
        setNoti(true);
        setTimeout(() => setNoti(false), 5000);
      } else {
        const likedData = {
          id: car._id,
          email: user.email,
          speed: car.specs.speed,
          year: car.specs.year,
          status: car.status,
          rating: car.rating,
          price: car.price,
          image: car.image,
          name: car.name,
          model: car.model,
          brand: car.brand
        }
        await link.post("/like-car", likedData);
        await refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
            src={image || "/placeholder.svg"}
            alt={name}
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
              {loading || isFetching ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : user?.email && likedCar.email === user.email && likedCar.id === car._id ? (
                <Heart className="w-5 h-5 text-white fill-current" />
              ) : (
                <Heart onClick={handleLiked} className="w-5 h-5 cursor-pointer text-white" />
              )}

            </motion.button>
          </motion.div>

          <div className="absolute top-4 left-4 flex gap-2">
            {
              <span className="px-3 py-1 bg-blue-500 text-white uppercase text-xs font-semibold rounded-full shadow-lg">
                {status}
              </span>
            }
            <span className="px-3 py-1  bg-white/20 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-semibold rounded-full shadow-lg">
              {year}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-500 font-semibold text-sm">{condition}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">4.5</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>

          <div className="flex gap-4 mb-4 text-gray-600 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4">
                <IoIosSpeedometer />
              </span>
              {speed}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4">
                <TbTransitionBottomFilled />
              </span>
              {transmission}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4">
                <IoIosColorPalette />
              </span>
              {color}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-500">${price.toLocaleString()}</span>
            <NavLink to={`/car/${_id}`}>
              <motion.button
                className="px-3 py-2 bg-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300"
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
      <AnimatePresence>
        {isVisibleNoti && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-20 z-50 right-0 sm:right-4 max-w-sm w-full rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              </motion.div>

              <div className="flex-1">
                <motion.p
                  className="text-sm mt-1 text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Oops! You are not logged in. Please log in to interact with this feature.
                </motion.p>
              </div>

              <button
                onClick={() => setNoti(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <motion.div
              className="mt-4 text-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <NavLink to="/register" onClick={() => setNoti(false)}>
                <button className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-red-500 hover:bg-red-600 text-white">
                  Register Now
                </button>
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CarCard

