import { DateValue as ReactDateValue } from '@react-types/datepicker'
export function convertDateValueToDate(dateValue: ReactDateValue): Date {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
}
