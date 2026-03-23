export const normalizePaginatedData = (response, page = 1, limit = 8) => {
  const data = Array.isArray(response?.data) ? response.data : []
  const hasServerPagination =
    typeof response?.total === "number" || typeof response?.totalPages === "number"

  const total = typeof response?.total === "number"
    ? response.total
    : typeof response?.count === "number"
      ? response.count
      : data.length

  const totalPages = typeof response?.totalPages === "number"
    ? response.totalPages
    : Math.max(1, Math.ceil(total / limit))

  const safePage = Math.min(Math.max(page, 1), totalPages)
  const pagedData = hasServerPagination
    ? data
    : data.slice((safePage - 1) * limit, safePage * limit)

  return {
    data: pagedData,
    total,
    totalPages,
    currentPage: safePage,
    count: typeof response?.count === "number" ? response.count : pagedData.length,
    usedClientFallback: !hasServerPagination,
  }
}
