"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const articles = [
    {
        id: 1,
        title: "Rivian Launches R1T Lease Program in Select States",
        category: "New Car Review",
        date: "October 15, 2024",
        image: "https://autodealwordpress.com/wp-content/uploads/2024/10/Img-32-840x461.webp",
        description:
            "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa",
        admin: "Admin",
    },
    {
        id: 2,
        title: "The 2024 Subaru WRX Is Now $2,230 More Expensive",
        category: "Races And Chases",
        date: "October 15, 2024",
        image: "https://autodealwordpress.com/wp-content/uploads/2024/10/Img-31-840x473.webp",
        description:
            "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa",
        admin: "Admin",
    },
    {
        id: 3,
        title: "Maintenance Every Car to service Owner Should Know",
        category: "Technology",
        date: "October 15, 2024",
        image: "https://autodealwordpress.com/wp-content/uploads/2024/10/Img-33-840x445.webp",
        description:
            "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa",
        admin: "Admin",
    },
]

const ArticleCard = ({ article, index }) => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.2,
            },
        },
    }

    return (
        <motion.article
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg mb-4">
                <motion.img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={840}
                    height={473}
                    className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded">{article.date}</span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-black dark:text-white">{article.admin}</span>
                    <span className="text-sm text-blue-500">{article.category}</span>
                </div>

                <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-blue-500 dark:text-white">
                    {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{article.description}</p>
            </div>
        </motion.article>
    )
}

export default function Blogs() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section className="max-w-7xl my-20 mx-auto px-4 py-12">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={headerVariants}
                className="flex flex-col sm:flex-row justify-between items-center mb-8"
            >
                <h2 className="text-2xl font-bold mb-4 sm:mb-0 dark:text-white">News to help choose your car</h2>
                <a href="#" className="text-sm hover:underline text-blue-500 transition-colors duration-300">
                    View all →
                </a>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                ))}
            </div>
        </section>
    )
}

