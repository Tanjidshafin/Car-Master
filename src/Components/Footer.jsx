import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { NavLink } from "react-router"

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-gray-300 dark:bg-gray-950 dark:text-gray-400"
        >
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h3 className="text-2xl font-bold text-white">Car Master</h3>
                    <p className="text-sm leading-relaxed">
                        Your trusted partner in finding the perfect vehicle. We offer a wide selection of premium cars with
                        exceptional service.
                    </p>
                    <div className="flex space-x-4">
                        <motion.a whileHover={{ scale: 1.2 }} to="/not-found" className="hover:text-red-500">
                            <Facebook size={20} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2 }} to="/not-found" className="hover:text-red-500">
                            <Twitter size={20} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2 }} to="/not-found" className="hover:text-red-500">
                            <Instagram size={20} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2 }} to="/not-found" className="hover:text-red-500">
                            <Youtube size={20} />
                        </motion.a>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-bold text-white">Quick NavLinks</h3>
                    <ul className="space-y-2">
                        {["New Cars", "Used Cars", "Car Services", "About Us", "Contact"].map((item, index) => (
                            <motion.li key={index} whileHover={{ x: 5 }}>
                                <NavLink to="/not-found" className="hover:text-red-500 transition-colors">
                                    {item}
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-bold text-white">Our Services</h3>
                    <ul className="space-y-2">
                        {["Car Inspection", "Auto Loans", "Car Insurance", "Car Maintenance", "Car Selling"].map((item, index) => (
                            <motion.li key={index} whileHover={{ x: 5 }}>
                                <NavLink to="/not-found" className="hover:text-red-500 transition-colors">
                                    {item}
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                >
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3">
                            <Phone size={20} className="text-red-500" />
                            <span>+01715257080</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail size={20} className="text-red-500" />
                            <span>tanjidshafin1234@gmail.com</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <MapPin size={20} className="text-red-500" />
                            <span>Feni, Bangladesh</span>
                        </li>
                    </ul>
                </motion.div>
            </div>

            <div className="border-t border-gray-800 mt-8">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">© 2025 Car Master All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <NavLink to="/not-found" className="text-sm hover:text-red-500">
                            Privacy Policy
                        </NavLink>
                        <NavLink to="/not-found" className="text-sm hover:text-red-500">
                            Terms of Service
                        </NavLink>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer

