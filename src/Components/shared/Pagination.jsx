/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

const buildPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) pages.push("start-ellipsis")

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  if (end < totalPages - 1) pages.push("end-ellipsis")

  pages.push(totalPages)
  return pages
}

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null

  const pageItems = buildPageNumbers(currentPage, totalPages)

  return (
    <nav className={`mt-12 mb-8 ${className}`} aria-label="Pagination">
      <div className="flex items-center justify-center">
        <div className="rounded-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 p-1 shadow-lg">
          <div className="flex items-center rounded-full bg-white p-1 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-500 p-2 text-white transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 px-4">
              {pageItems.map((item) =>
                typeof item === "number" ? (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onPageChange(item)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                      currentPage === item
                        ? "scale-110 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    aria-current={currentPage === item ? "page" : undefined}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={item} className="flex h-8 w-8 items-center justify-center text-gray-400 dark:text-gray-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-500 p-2 text-white transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  )
}

export default Pagination
