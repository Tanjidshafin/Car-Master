"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Phone, MessageCircle, MapPin, CalendarRange, ArrowRight } from "lucide-react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import BaseUrl from "../Hooks/BaseUrl"
import CarSkeleton from "../Components/CarSkeleton"
import BookingForm from "../Components/booking/BookingForm"
import { chatService } from "../services/chatService"
import { bookingService } from "../services/bookingService"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { connectSocket } from "../services/socket"
import { SurfaceCard } from "../Components/dashboard/PremiumShell"

export default function CarDetails() {
    const [selectedImage, setSelectedImage] = useState(0)
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [chattingId, setChattingId] = useState(null)
    const [chatInfo, setChatInfo] = useState("")
    const { id } = useParams()
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const link = BaseUrl()
    const {
        data: car = {},
        isFetching,
    } = useQuery({
        queryKey: ["car"],
        queryFn: async () => {
            const res = await link.get(`/car/${id}`)
            return res.data.data
        },
    })
    const galleryImages = Array.isArray(car.images) && car.images.length > 0 ? car.images : [car.image || "/placeholder.svg"]
    const seller = car.seller || null

    const createConversation = useMutation({
        mutationFn: chatService.createConversation,
        onSuccess: (conversation) => {
            setChatInfo("Conversation ready. Opening messages...")
            navigate(`/messages?conversationId=${conversation._id}`)
        },
        onError: (err) => setChatInfo(err?.response?.data?.error || "Failed to start chat"),
    })

    const createBooking = useMutation({
        mutationFn: bookingService.createBooking,
        onSuccess: () => {
            setShowBookingForm(false)
            setChatInfo("Test drive request sent. You can track it from My Bookings.")
        },
    })
    const handleStartChat = async () => {
        const sellerId = seller?._id
        const carId = car?._id
        if (!user?.email || !sellerId) {
            setChatInfo("Please login and ensure seller info is available.")
            return
        }
        if (chattingId === sellerId) return
        try {
            setChattingId(sellerId)
            connectSocket()
            await createConversation.mutateAsync({
                vendor_id: sellerId,
                car_id: carId
            })
        } catch (error) {
            console.error("Failed to start chat:", error)
        } finally {
            setChattingId(null)
        }
    }

    const SellerAndBookingSection = () => (
        <div className="space-y-5">
            <SurfaceCard className="space-y-4 rounded-[1.4rem] p-5 shadow-[0_14px_40px_rgba(148,163,184,0.12)] dark:shadow-[0_14px_40px_rgba(15,23,42,0.18)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600/80 dark:text-sky-300/80">Seller information</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{seller?.displayName || "Assigned vendor pending"}</h3>
                        <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                                <MapPin className="h-4 w-4" />
                                {seller?.location || car.location || "Location not added"}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                                <Phone className="h-4 w-4" />
                                {seller?.phone || car.contact || "Phone not provided"}
                            </span>
                        </div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-100 text-base font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                        {seller?.photoURL ? (
                            <img src={seller.photoURL} alt={seller.displayName || "Seller"} className="h-full w-full object-cover" />
                        ) : (
                            (seller?.displayName || seller?.email || "CM").slice(0, 2).toUpperCase()
                        )}
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
                        <Phone className="h-5 w-5" />
                        <span>{seller?.phone || car.contact || "Not Provided"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleStartChat}
                        disabled={chattingId === seller?._id}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:border-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                    >
                        {chattingId === seller?._id ? (
                            <>
                                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-slate-950 dark:border-t-transparent" />
                                <span>Contacting...</span>
                            </>
                        ) : (
                            <>
                                <MessageCircle className="h-5 w-5" />
                                <span>Contact Seller</span>
                            </>
                        )}
                    </button>
                </div>
                {seller?._id ? (
                    <NavLink to={`/vendor/${seller._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200">
                        Visit seller profile
                        <ArrowRight className="h-4 w-4" />
                    </NavLink>
                ) : null}
            </SurfaceCard>

            <SurfaceCard className="space-y-4 rounded-[1.4rem] p-5 shadow-[0_14px_40px_rgba(148,163,184,0.12)] dark:shadow-[0_14px_40px_rgba(15,23,42,0.18)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600/80 dark:text-sky-300/80">Booking options</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Book a test drive</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Choose a date, send your request, and track the vendor response from your booking page.</p>
                    </div>
                    <NavLink to="/my-bookings" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
                        <CalendarRange className="h-4 w-4" />
                        My Bookings
                    </NavLink>
                </div>
                <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
                    <div className="flex items-center gap-3">
                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">Book test drive</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Choose a date and let the vendor confirm availability.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowBookingForm((prev) => !prev)}
                        className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${showBookingForm
                            ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                            : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                            }`}
                    >
                        {showBookingForm ? "Hide form" : "Open booking form"}
                    </button>
                </div>
                {chatInfo ? <p className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">{chatInfo}</p> : null}
                {showBookingForm ? (
                    <BookingForm
                        loading={createBooking.isPending}
                        onSubmit={(form) => createBooking.mutate({ car_id: car._id, ...form })}
                    />
                ) : null}
            </SurfaceCard>
        </div>
    )

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900">
            <div className="relative h-[300px] w-full">
                <img
                    src="https://autopro.jwsuperthemes.com/wp-content/uploads/2017/06/bg-tt.jpg"
                    alt="Cars Banner"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50">
                    <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Vehicles Detail
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-2 text-gray-300"
                        >
                            <NavLink to="/all-cars">
                                <span>All Cars</span>
                            </NavLink>
                            <span>/</span>
                            <NavLink to={`/car/${id}`}>
                                <span>{isFetching ? "Loading..." : car.name}</span>
                            </NavLink>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {isFetching ? (
                    <CarSkeleton />
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedImage}
                                            src={galleryImages[selectedImage]}
                                            alt={`${car.name} Image ${selectedImage + 1}`}
                                            className="w-full h-full object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2">
                                        <Star className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                                        {selectedImage + 1}/{galleryImages.length}
                                    </div>
                                </div>
                                <div className={`grid grid-cols-4 gap-2`}>
                                    {galleryImages.map((img, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedImage(i)}
                                            className={`relative rounded-lg overflow-hidden ${selectedImage === i ? "ring-2 ring-orange-500" : ""
                                                }`}
                                        >
                                            <img
                                                src={img || "/placeholder.svg"}
                                                alt={`${car.name} Thumbnail ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Description</h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 lg:max-w-md"
                        >
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span>{car.specs?.year}</span>
                                    <span>•</span>
                                    <span>{car.specs?.transmission}</span>
                                    <span>•</span>
                                    <span>{car.specs?.color}</span>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-orange-500">${car.price}</div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Brand</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.brand}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Model</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.model}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Color</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.color}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Transmission</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.transmission}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Condition</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.condition}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.year}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Speed</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{car.specs?.speed}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                                    <div className="font-medium uppercase text-gray-900 dark:text-white">{car.status}</div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {car.status === "SpecialOffer" && "Special Offer"} ID #{car._id?.slice(-6)}
                            </div>
                            <SellerAndBookingSection />
                        </motion.div>
                    </div>
                )}
            </div>
        </main>
    )
}
