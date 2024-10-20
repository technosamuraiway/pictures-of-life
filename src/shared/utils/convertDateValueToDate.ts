import { DateValue } from '@internationalized/date'

export function convertDateValueToDate(dateValue: DateValue): Date {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
}
