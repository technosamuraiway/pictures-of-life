import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { DateValue } from '@internationalized/date'
import {
  Calendar,
  CalendarProps,
  Typography,
  convertDateValueToDate,
} from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ControlledCalendar.module.scss'

type ControlledCalendarProps<T extends FieldValues> = {
  setErrorMessage: (errorMessage: string) => void
} & Omit<CalendarProps, 'onRangeChange' | 'onSingleChange' | 'valueRange' | 'valueSingle'> &
  UseControllerProps<T>

export const ControlledCalendar = <T extends FieldValues>({
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
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  })

  const onValueChangeHandler = (date: { end: DateValue; start: DateValue } | DateValue) => {
    if (rest.mode === 'range') {
      onChange(date)
      rest.onRangeChange?.(date as { end: DateValue; start: DateValue })
    } else {
      // const singleDate = (date as DateValue)?.toDate?.()
      const singleDate = convertDateValueToDate(date)

      if (singleDate && !isNaN(singleDate.getTime())) {
        const age = checkAge(singleDate)

        if (age < 13) {
          setErrorMessage(t.settingsPage.infoForm.errorMessage)
        } else {
          setErrorMessage('')
          onChange(singleDate.toISOString().split('T')[0])
        }
      } else {
        setErrorMessage('')
        onChange('')
      }
      rest.onSingleChange?.(date as DateValue)
    }
  }

  const checkAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  // const checkAge = (birthDate: Date) => {
  //   const today = new Date()
  //   const age = today.getFullYear() - birthDate.getFullYear()
  //   const monthDiff = today.getMonth() - birthDate.getMonth()
  //
  //   return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //     ? age - 1
  //     : age
  // }
  //
  // const handleDateChange = ({ start }: { start?: Date | null }) => {
  //   if (start && !isNaN(start.getTime())) {
  //     if (checkAge(start) < 13) {
  //       setErrorMessage(t.settingsPage.infoForm.errorMessage)
  //     } else {
  //       setErrorMessage('')
  //       setValue('dateOfBirth', start.toISOString().split('T')[0])
  //     }
  //   } else {
  //     setErrorMessage('')
  //     setValue('dateOfBirth', '')
  //   }
  // }
  //
  // const onValueChangeHandler = (date: { end: DateValue; start: DateValue } | DateValue) => {
  //   onChange(date)
  //   if (rest.mode === 'range') {
  //     rest.onRangeChange?.(date as { end: DateValue; start: DateValue })
  //   } else {
  //     rest.onSingleChange?.(date as DateValue)
  //   }
  // }

  return (
    <div className={s.dateOfBirthWrapper}>
      <Calendar
        {...rest}
        errorMessage={error?.message}
        onRangeChange={rest.mode === 'range' ? onValueChangeHandler : undefined}
        onSingleChange={rest.mode === 'single' ? onValueChangeHandler : undefined}
        valueRange={rest.mode === 'range' ? value : undefined}
        valueSingle={rest.mode === 'single' ? value : undefined}
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
