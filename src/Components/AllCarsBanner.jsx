"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AllCarsBanner() {
    const marqueeRef = useRef(null)
    useEffect(() => {
        const marqueeElement = marqueeRef.current
        let position = 0

        const animate = () => {
            position -= 0.5
            marqueeElement.style.transform = `translateX(${position}px)`

            if (Math.abs(position) >= marqueeElement.offsetWidth / 2) {
                position = 0
            }

            requestAnimationFrame(animate)
        }

        const animation = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animation)
    }, [])

    return (
        <div className="relative md:h-screen h-[50rem] w-full overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://sjc.microlink.io/VG6FqA2iRqLF93Xx33S-0M6Xoyt1sYy3pmBRVp3DnESrqW0cN1a-jWP5FF9U8cB6qhJPCt48tIKxXmpt38mlYA.jpeg"
                    alt="Luxury Red Car"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div
                    ref={marqueeRef}
                    className="whitespace-nowrap text-[20vw] mt-20 md:mt-0 font-bold text-white/10"
                    style={{ width: "200%" }}
                >
                    CAR MASTER CAR MASTER CAR MASTER
                </div>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center"
                >
                    <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">BROWSE OUR</h1>
                    <h2 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                            LATEST CAR
                        </span>
                    </h2>
                    <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl lg:text-6xl">MODELS</h2>
                    <motion.p
                        className="text-red-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        [ YOUR IDEAL CAR IS A CLICK WAY ]
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}

