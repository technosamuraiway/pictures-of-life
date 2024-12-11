export function formatDateToTime(dateString: string): string {
  const date = new Date(dateString)

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })
}
