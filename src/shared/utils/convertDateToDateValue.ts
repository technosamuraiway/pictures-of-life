import { CalendarDate, DateValue } from '@internationalized/date'

export function convertDateToDateValue(date: Date | null | undefined): DateValue | undefined {
  if (!date || isNaN(date.getTime())) {
    return undefined
  }

  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}
