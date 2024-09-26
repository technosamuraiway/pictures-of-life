export const convertDate = (isoDate: string) => {
  const date = new Date(isoDate)

  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
