const CarCardSkeleton = () => {
    return (
        <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg animate-pulse">
            <div className="relative aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
                <div className="flex gap-4 mt-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default CarCardSkeleton

