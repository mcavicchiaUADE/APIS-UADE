export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price)
}
export const formatDate = (dateString) => {
  // Validar que dateString existe y no es null/undefined
  if (!dateString) {
    return "Fecha no disponible"
  }
  
  // Intentar crear la fecha
  const date = new Date(dateString)
  
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    return "Fecha inválida"
  }
  
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}
