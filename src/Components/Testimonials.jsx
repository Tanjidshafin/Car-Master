import { MessageSquare } from "lucide-react"
import EachTestimonials from "../Hooks/EachTestimonial"


const Testimonials = () => {
    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
                <div className="mb-12 text-center">
                    <MessageSquare className="text-blue-500 w-16 h-16 mx-auto mb-4 animate-bounce" />
                    <h1 className="text-4xl font-extrabold mb-4  dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                        What Our Customers Say
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover why we're the most trusted dealership in New York. Our customers' experiences speak volumes.
                    </p>
                </div>
            </div>
            <div>
                <EachTestimonials />
            </div>
        </div>
    )
}

export default Testimonials

