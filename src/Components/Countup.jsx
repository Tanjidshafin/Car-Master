"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { ArrowRight } from "lucide-react"

export default function Countup() {
    const [statsRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="w-full bg-white mt-32 dark:bg-gray-900">
            <div className="max-w-screen-2xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-2xl overflow-hidden">
                        <img
                            src="https://blog.spoongraphics.co.uk/wp-content/uploads/2019/03/final-lg.jpg"
                            alt="Luxury car in mountains"
                            className="w-full h-[500px] object-cover"
                        />

                    </div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Get A Fair Price For Your Car
                            <br />
                            Sell To Us Today
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            We are committed to providing our customers with exceptional service, competitive pricing, and a wide
                            range of.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "We are the UK's largest provider, with more patrols in more places",
                                "You get 24/7 roadside assistance",
                                "We fix 4 out of 5 cars at the roadside",
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                                >
                                    <span className="text-blue-600">✓</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
                <motion.div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                    {[
                        { value: 836, label: "CARS FOR SALE" },
                        { value: 738, label: "DEALER REVIEWS" },
                        { value: 100, label: "VISITORS PER DAY" },
                        { value: 238, label: "VERIFIED DEALERS" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {inView && <CountUp end={stat.value} suffix="M" duration={2} separator="," />}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

