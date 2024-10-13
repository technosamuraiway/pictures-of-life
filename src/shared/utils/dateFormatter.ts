import { useRouterLocaleDefinition } from '@/shared'

export const formatDate = (
  dateString: string,
  t: ReturnType<typeof useRouterLocaleDefinition>
): string => {
  const date = new Date(dateString)

  const monthNames = [
    t.months.january,
    t.months.february,
    t.months.march,
    t.months.april,
    t.months.may,
    t.months.june,
    t.months.july,
    t.months.august,
    t.months.september,
    t.months.october,
    t.months.november,
    t.months.december,
  ]

  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
