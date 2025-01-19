import { CalendarDate } from '@internationalized/date'
import { DateValue as ReactDateValue } from '@react-types/datepicker'

export function convertDateToDateValue(date: Date | null | undefined): ReactDateValue | undefined {
  if (!date || isNaN(date.getTime())) {
    return undefined
  }

  // @ts-ignore
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}
