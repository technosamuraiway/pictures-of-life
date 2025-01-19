import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import {
  PATH,
  convertDateToDateValue,
  convertDateValueToDate,
  useRouterLocaleDefinition,
} from '@/shared'
import { DateValue as ReactDateValue } from '@react-types/datepicker'
import { Calendar, CalendarProps, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ControlledSingleCalendar.module.scss'

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

  const checkAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const onValueChangeHandler = (date: ReactDateValue) => {
    const singleDate = convertDateValueToDate(date)
    const age = checkAge(singleDate)

    if (age < 13) {
      setErrorMessage(t.settingsPage.infoForm.errorMessage)
    } else {
      setErrorMessage('')
      onChange(singleDate)
    }
  }

  const dateValue = convertDateToDateValue(value)

  return (
    <div className={s.dateOfBirthWrapper}>
      <Calendar
        {...field}
        {...rest}
        errorMessage={error?.message || errorMessage}
        mode={'single'}
        onSingleChange={onValueChangeHandler}
        valueSingle={dateValue}
      />
      {(error?.message || errorMessage) && (
        <div className={s.errorDiv}>
          <Typography variant={'regular-text-14'}>{error?.message || errorMessage}</Typography>
          <Link href={`${PATH.AUTH.PRIVACYPOLICY}?previousPath=${encodeURIComponent(currentPath)}`}>
            <Typography className={s.linkPrivacy} variant={'small-link'}>
              {t.settingsPage.infoForm.privacyPol}
            </Typography>
          </Link>
        </div>
      )}
    </div>
  )
}
