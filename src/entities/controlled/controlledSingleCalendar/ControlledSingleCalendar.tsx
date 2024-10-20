import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { CalendarDate, DateValue, parseDate } from '@internationalized/date'
import { Calendar, CalendarProps, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ControlledSingleCalendar.module.scss'

function convertDateToDateValue(dateValue: DateValue): Date {
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
}

type ControlledCalendarProps<T extends FieldValues> = {
  setErrorMessage: (errorMessage: string) => void
} & Omit<CalendarProps, 'onSingleChange' | 'valueSingle'> &
  UseControllerProps<T>

export const ControlledSingleCalendar = <T extends FieldValues>({
  control,
  errorMessage,
  name,
  rules,
  setErrorMessage,
  ...rest
}: ControlledCalendarProps<T>) => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const currentPath = router.asPath

  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  })

  const onValueChangeHandler = (date: DateValue) => {
    const singleDate = convertDateToDateValue(date as DateValue)

    if (singleDate && !isNaN(singleDate.getTime())) {
      const age = checkAge(singleDate)

      if (age < 13) {
        setErrorMessage(t.settingsPage.infoForm.errorMessage)
      } else {
        setErrorMessage('')
        onChange(singleDate)
      }
    } else {
      setErrorMessage('')
      onChange(undefined)
    }
  }

  const dateValue =
    value && new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate())

  const checkAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  return (
    <div className={s.dateOfBirthWrapper}>
      <Calendar
        {...field}
        {...rest}
        errorMessage={error?.message}
        mode={'single'}
        onSingleChange={onValueChangeHandler}
        valueSingle={dateValue}
      />
      {error?.message ||
        (errorMessage && (
          <div className={s.errorDiv}>
            <Typography variant={'regular-text-14'}>{error?.message || errorMessage}</Typography>
            <Link
              href={`${PATH.AUTH.PRIVACYPOLICY}?previousPath=${encodeURIComponent(currentPath)}`}
            >
              <Typography className={s.linkPrivacy} variant={'small-link'}>
                {t.settingsPage.infoForm.privacyPol}
              </Typography>
            </Link>
          </div>
        ))}
    </div>
  )
}
