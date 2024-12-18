export const formatDateToToday = (dateString: string, t: string) => {
  const today = new Date()
  const [day, month, year] = dateString.split('.').map(Number)
  const messageDate = new Date(year, month - 1, day)

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return t
  }

  return dateString
}
