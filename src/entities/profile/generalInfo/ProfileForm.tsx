import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ProfileFormValues, profileSchema } from '@/entities/zodValidationScheme'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import CountryCitySelector from '@/shared/components/CountryCitySelect/CountryCitySelect'
import { formatDateString } from '@/shared/utils/dateUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MyDatePicker, TextArea, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './ProfileForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled: boolean
  defaultValues: ProfileFormValues
  onSubmitProfileForm: (data: ProfileFormValues, reset: () => void) => void
}

export const ProfileForm = ({ buttonDisabled, defaultValues, onSubmitProfileForm }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const { control, handleSubmit, register, reset, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues,
    resolver: zodResolver(profileSchema),
  })

  const [errorMessage, setErrorMessage] = useState('')

  const checkAge = (birthDate: Date) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age
  }

  const handleDateChange = ({ start }: { start?: Date | null }) => {
    if (start) {
      setDateOfBirth(start)
      if (checkAge(start) < 13) {
        setErrorMessage(t.settingsPage.infoForm.errorMssage)
      } else {
        setErrorMessage('')
        setValue('dateOfBirth', start.toISOString())
      }
    } else {
      setDateOfBirth(null)
      setValue('dateOfBirth', '')
      setErrorMessage('')
    }
  }

  const onSubmitFormHandler = (data: ProfileFormValues) => {
    const formattedData = {
      ...data,
      aboutMe: data.aboutMe || '',
      city: data.city || '',
      country: data.country || '',
      dateOfBirth: data.dateOfBirth ? formatDateString(data.dateOfBirth) : '',
      region: data.region || '',
    }

    onSubmitProfileForm(formattedData, reset)
  }

  const userName = watch('userName')
  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const isButtonDisabled = !userName || !firstName || !lastName || !!errorMessage

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <div className={s.spanDiv}>
        <label className={s.labelInput}>
          {t.settingsPage.infoForm.userName} <span className={s.span}>*</span>
        </label>

        <ControlledTextField
          autoComplete={'username'}
          control={control}
          name={'userName'}
          type={'text'}
        />
      </div>

      <div className={s.spanDiv}>
        <label className={s.labelInput}>
          {t.settingsPage.infoForm.firstName} <span className={s.span}>*</span>
        </label>
        <ControlledTextField
          autoComplete={'first-name'}
          control={control}
          name={'firstName'}
          type={'text'}
        />
      </div>

      <div className={s.spanDiv}>
        <label className={s.labelInput}>
          {t.settingsPage.infoForm.lastName} <span className={s.span}>*</span>
        </label>
        <ControlledTextField
          autoComplete={'last-name'}
          control={control}
          name={'lastName'}
          type={'text'}
        />
      </div>

      <div className={s.dateOfBirthWrapper}>
        <label className={s.labelDate}>
          <Typography variant={'regular-text-14'}>{t.settingsPage.infoForm.dateBir}</Typography>
        </label>
        <MyDatePicker
          {...register('dateOfBirth')}
          locale={t.locale}
          mode={'single'}
          onDateChange={handleDateChange}
        />
        {errorMessage && (
          <div className={s.errorDiv}>
            <Typography className={s.link} variant={'regular-text-14'}>
              {errorMessage}
            </Typography>
            <Link href={PATH.AUTH.PRIVACYPOLICY}>
              <Typography className={s.linkPrvacy} variant={'small-link'}>
                {t.settingsPage.infoForm.privacyPol}
              </Typography>
            </Link>
          </div>
        )}
      </div>

      <div className={s.selectDiv}>
        <CountryCitySelector
          onCityChange={cityId => setValue('city', cityId.toString())}
          onCountryChange={countryId => setValue('country', countryId.toString())}
          onStateChange={stateId => setValue('region', stateId.toString())}
        />
      </div>

      <div>
        <label className={s.labelDate}>
          <Typography variant={'regular-text-14'}>{t.settingsPage.infoForm.textArea}</Typography>
        </label>
        <TextArea {...register('aboutMe')} placeholder={t.settingsPage.infoForm.textAreaPlace} />
      </div>

      <Button
        className={s.submitButton}
        disabled={buttonDisabled || isButtonDisabled}
        type={'submit'}
      >
        Save Changes
      </Button>
    </form>
  )
}
