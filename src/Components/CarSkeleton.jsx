import { motion } from "framer-motion"

export default function CarSkeleton() {
    return (
        <div className="grid lg:grid-cols-2 gap-8">

            <div className="space-y-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse" />

                    <div className="grid grid-cols-4 gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
                    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </motion.div>
            </div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6 lg:max-w-md"
            >
                <div className="space-y-2">
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>

                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />

                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-col sm:flex-row">
                        <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                        <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                    </div>
                    <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>

                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </motion.div>
        </div>
    )
}

