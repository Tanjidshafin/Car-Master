"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Car, PenToolIcon as Tool, Shield } from "lucide-react"

const slides = [
    {
        images:
            "https://wallpapercat.com/w/full/1/4/2/607660-3840x2160-desktop-4k-sports-car-background-photo.jpg",
        title: "Welcome to",
        subtitle: "Car Master",
    },
    {
        images: "https://wallpapers.com/images/hd/best-cars-background-ce8nni4v14vzluck.jpg",
        title: "Find Your",
        subtitle: "Perfect Vehicle",
    },
    {
        images: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2024/wallpaper/m-wallpaper/3-0-csl/bmw-3-0-csl-mi-05.jpg",
        title: "Get In",
        subtitle: "Fixed Prices",
    },
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [nextSlide])

    return (
        <div className="relative h-[900px] max-w-screen-2xl mx-auto overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.images})` }}>
                        <div className="absolute inset-0 bg-black opacity-40" />
                    </div>
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-full flex flex-col justify-center">
                            <div className="max-w-3xl">
                                <h2
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 
                  animate-fade-in-up opacity-0"
                                    style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                                >
                                    {slide.title}
                                </h2>
                                <h1
                                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8
                  animate-fade-in-up opacity-0"
                                    style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                                >
                                    {slide.subtitle}
                                </h1>
                                <button
                                    className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg 
                  hover:bg-orange-600 transition-colors animate-fade-in-up opacity-0"
                                    style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                                >
                                    View Inventory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 
          text-white hover:bg-white/30 transition-colors"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 
          text-white hover:bg-white/30 transition-colors"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-orange-500" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

