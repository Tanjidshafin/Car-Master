import { useEffect, useMemo, useState } from "react"

const useClientPagination = (items = [], itemsPerPage = 6, resetKey = "") => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  useEffect(() => {
    setCurrentPage(1)
  }, [resetKey])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [currentPage, items, itemsPerPage])

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    showPagination: items.length > itemsPerPage,
  }
}

export default useClientPagination
