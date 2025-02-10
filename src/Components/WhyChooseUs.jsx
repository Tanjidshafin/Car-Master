"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Users, CreditCard } from "lucide-react"

export default function WhyChooseUs() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const features = [
        {
            icon: Award,
            iconBg: "bg-red-50 dark:bg-red-900/20",
            iconColor: "text-red-500 dark:text-red-400",
            title: "Wide range of brands",
            description:
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
        },
        {
            icon: Users,
            iconBg: "bg-green-50 dark:bg-green-900/20",
            iconColor: "text-green-500 dark:text-green-400",
            title: "Trusted by our clients",
            description:
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
        },
        {
            icon: CreditCard,
            iconBg: "bg-blue-50 dark:bg-blue-900/20",
            iconColor: "text-blue-500 dark:text-blue-400",
            title: "Fast & easy financing",
            description:
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.",
        },
    ]

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
                ease: "easeOut",
            },
        },
    }

    return (
        <section className="py-16 px-4 mt-40 md:py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Why choose us?</h2>
                </motion.div>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-full ${feature.iconBg} flex items-center justify-center mb-6`}>
                                <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

