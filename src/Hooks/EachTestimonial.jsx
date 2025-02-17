"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Star } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        name: "Alice Johnson",
        role: "Car Enthusiast",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        text: "The service I received was exceptional. They helped me find my dream car at an unbeatable price!",
        background:
            "https://plus.unsplash.com/premium_photo-1686730540270-93f2c33351b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "First-time Buyer",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 4,
        text: "As a first-time buyer, I was nervous, but the staff made the process smooth and enjoyable.",
        background: "https://wallpapers.com/images/featured/sports-car-background-ybiazay5uj4y5r5p.jpg",
    },
    {
        id: 3,
        name: "Carol Davis",
        role: "Luxury Car Owner",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        text: "Their selection of luxury vehicles is impressive. I found exactly what I was looking for!",
        background:
            "https://plus.unsplash.com/premium_photo-1686730540270-93f2c33351b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Family Man",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        text: "They helped me find the perfect family car. Safe, spacious, and within my budget!",
        background: "https://wallpapers.com/images/featured/sports-car-background-ybiazay5uj4y5r5p.jpg",
    },
]

const TestimonialCard = ({ testimonial }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="relative w-screen h-screen flex items-center justify-center flex-shrink-0"
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${testimonial.background}')`,
                    filter: "brightness(0.3)",
                }}
            ></div>
            <div className="relative z-10  max-w-2xl mx-auto p-8 bg-black bg-opacity-50 rounded-lg text-white">
                <div className="flex items-center mb-4">
                    <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 border-2 border-white"
                    />
                    <div>
                        <h3 className="font-bold text-2xl">{testimonial.name}</h3>
                        <p className="text-gray-300">{testimonial.role}</p>
                    </div>
                </div>
                <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-6 h-6 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                    ))}
                </div>
                <p className="text-lg italic">&ldquo;{testimonial.text}&rdquo;</p>
            </div>
        </motion.div>
    )
}

const EachTestimonials = () => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 flex gap-10 overflow-hidden">
                <motion.div style={{ x }} className="flex lg:gap-10">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default EachTestimonials