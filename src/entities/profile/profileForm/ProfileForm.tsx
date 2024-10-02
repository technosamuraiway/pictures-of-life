import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IProfile, ProfileFormValues, profileValidationScheme } from '@/entities'
import { useGetProfileQuery } from '@/services'
import { CountryCitySelect, PATH, formatDateToISOString, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MyDatePicker, TextArea, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled: boolean
  onSubmitProfileForm: (data: ProfileFormValues) => void
}

export const ProfileForm = ({ buttonDisabled, onSubmitProfileForm }: IProps) => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const currentPath = router.asPath

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)

  const profileTranslate: IProfile = {
    aboutMe: {
      aboutMe: t.validationSchemes.aboutMe,
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
    },
    firstName: {
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
      name: t.validationSchemes.firstName,
    },
    lastName: {
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
      name: t.validationSchemes.lastName,
    },
    userName: {
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
      username: t.validationSchemes.username,
    },
  }

  const { data: profileData } = useGetProfileQuery()

  const defaultValues = {
    aboutMe: profileData?.aboutMe || '',
    city: profileData?.city || '',
    country: profileData?.country || '',
    dateOfBirth: profileData?.dateOfBirth
      ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US')
      : '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    region: profileData?.region || '',
    userName: profileData?.userName || '',
  }

  const { control, handleSubmit, register, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues,
    resolver: zodResolver(profileValidationScheme(profileTranslate)),
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
        setErrorMessage(t.settingsPage.infoForm.errorMessage)
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
      dateOfBirth: data.dateOfBirth ? formatDateToISOString(data.dateOfBirth) : '',
      region: data.region || '',
    }

    onSubmitProfileForm(formattedData)
  }

  const userName = watch('userName')
  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const isButtonDisabled = !userName || !firstName || !lastName || !!errorMessage

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <ControlledTextField
        autoComplete={'username'}
        control={control}
        label={t.settingsPage.infoForm.userName}
        name={'userName'}
        type={'text'}
        withStar
      />
      <ControlledTextField
        autoComplete={'first-name'}
        control={control}
        label={t.settingsPage.infoForm.firstName}
        name={'firstName'}
        type={'text'}
        withStar
      />
      <ControlledTextField
        autoComplete={'last-name'}
        control={control}
        label={t.settingsPage.infoForm.lastName}
        name={'lastName'}
        type={'text'}
        withStar
      />

      <div className={s.dateOfBirthWrapper}>
        <Typography className={s.labelColor} variant={'regular-text-14'}>
          {t.settingsPage.infoForm.dateBirth}
        </Typography>

        <MyDatePicker
          {...register('dateOfBirth')}
          errorMessage={errorMessage}
          locale={t.locale}
          mode={'single'}
          onDateChange={handleDateChange}
        />
        {errorMessage && (
          <div className={s.errorDiv}>
            <Typography variant={'regular-text-14'}>{errorMessage}</Typography>
            <Link
              href={`${PATH.AUTH.PRIVACYPOLICY}?previousPath=${encodeURIComponent(currentPath)}`}
            >
              <Typography className={s.linkPrivacy} variant={'small-link'}>
                {t.settingsPage.infoForm.privacyPol}
              </Typography>
            </Link>
          </div>
        )}
      </div>

      <CountryCitySelect
        onCityChange={cityName => setValue('city', cityName)}
        onCountryChange={countryName => setValue('country', countryName)}
        onStateChange={stateName => setValue('region', stateName)}
      />

      <div>
        <Typography className={s.labelColor} variant={'regular-text-14'}>
          {t.settingsPage.infoForm.textArea}
        </Typography>
        <TextArea {...register('aboutMe')} placeholder={t.settingsPage.infoForm.textAreaPlace} />
      </div>

      <Button
        className={s.submitButton}
        disabled={buttonDisabled || isButtonDisabled}
        type={'submit'}
      >
        {t.settingsPage.infoForm.saveBtn}
      </Button>
    </form>
  )
}
