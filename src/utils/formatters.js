export const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`

export const formatDateTime = (value) => {
  if (!value) return "-"
  return new Date(value).toLocaleString()
}
