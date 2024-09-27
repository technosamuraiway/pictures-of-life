export const formatDateToISOString = (dateString: string | undefined): string => {
  if (!dateString) {
    return ''
  }

  const [month, day, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  return isNaN(date.getTime()) ? '' : date.toISOString()
}
