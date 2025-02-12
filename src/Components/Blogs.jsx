"use client"

import { NavLink } from "react-router"
import { motion } from "framer-motion"

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

export default function Blogs() {
    return (
        <section className="max-w-7xl my-20 mx-auto px-4 py-12">
            <motion.div initial={{ x: -50, y: -50 }} whileInView={{ x: 0, y: 0 }} transition={{ duration: 0.2 }} className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">News to help choose your car</h2>
                <NavLink href="#" className="text-sm hover:underline">
                    View all →
                </NavLink>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <article key={article.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg mb-4">
                            <motion.img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                width={840}
                                height={473}
                                className="w-full h-[250px] object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                            <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded">
                                {article.date}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold dark:text-white text-black">{article.admin}</span>
                                <span className="text-sm text-blue-500">{article.category}</span>
                            </div>

                            <motion.h3 whileHover={{ color: "#2196F3" }} transition={{ duration: 0.5 }} className="text-xl font-semibold">{article.title}</motion.h3>

                            <p className="text-gray-600 text-sm line-clamp-2">{article.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
