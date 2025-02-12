"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Car, FileText, RefreshCw } from "lucide-react"

const services = [
    {
        icon: Car,
        title: "Pre-Sale Preparation",
        description: "We're able to offer financing rates that many other car dealers can't offer.",
    },
    {
        icon: FileText,
        title: "Financing",
        description: "We're able to offer financing rates that many other car dealers can't offer.",
    },
    {
        icon: RefreshCw,
        title: "Trade-In Service",
        description:
            "Our service allows you to purchase a new car at an attractive price, while saving you all the trouble of handling your old car",
    },
]

export default function WhatWeOffer() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section className="max-w-7xl mx-auto my-10 px-4 py-16 md:py-24 dark:bg-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={controls}
                    variants={itemVariants}
                    className="relative"
                >
                    <div className="relative z-10">
                        <img
                            src="https://smartdata.tonytemplates.com/caleader-v2/wp-content/uploads/2019/09/layout01-03-1.jpg"
                            alt="Featublue Car"
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute -top-4 -right-4 w-full h-full border-2 border-blue-500 rounded-lg" />
                    </div>
                    <div className="absolute -z-10 top-0 left-0 text-[120px] font-bold text-gray-100 dark:text-gray-800 opacity-50">
                        offers
                    </div>
                </motion.div>
                <div>
                    <motion.h2
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={itemVariants}
                        className="text-4xl font-bold mb-12 dark:text-white"
                    >
                        What We Offer
                    </motion.h2>
                    <motion.div variants={containerVariants} initial="hidden" animate={controls} className="space-y-8">
                        {services.map((service, index) => (
                            <motion.div key={index} variants={itemVariants} className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

