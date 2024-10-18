import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IProfile, ProfileFormValues, profileValidationScheme } from '@/entities'
import { ControlledCalendar } from '@/entities/controlled/controlledCalendar/ControlledCalendar'
import { useGetProfileQuery } from '@/services'
import { CountryCitySelect, PATH, useRouterLocaleDefinition } from '@/shared'
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
  // const router = useRouter()
  // const currentPath = router.asPath

  const { data: profileData } = useGetProfileQuery()
  const [errorMessage, setErrorMessage] = useState('')
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

  const { control, handleSubmit, register, reset, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      region: '',
      userName: '',
    },
    resolver: zodResolver(profileValidationScheme(profileTranslate)),
  })

  useEffect(() => {
    if (profileData) {
      reset({
        aboutMe: profileData.aboutMe || '',
        city: profileData.city || '',
        country: profileData.country || '',
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
          : '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        region: profileData.region || '',
        userName: profileData.userName || '',
      })
    }
  }, [profileData, reset])

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

  const onSubmitFormHandler = (data: ProfileFormValues) => {
    const formattedData = {
      ...data,
      aboutMe: data.aboutMe || '',
      city: data.city || '',
      country: data.country || '',
      dateOfBirth: data.dateOfBirth || '',
      region: data.region || '',
    }

    onSubmitProfileForm(formattedData)
  }

  const userName = watch('userName')
  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const country = watch('country')
  const region = watch('region')
  const city = watch('city')
  const dateOfBirth = watch('dateOfBirth')
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
      <ControlledCalendar
        autoComplete={'dateOfBirth'}
        control={control}
        errorMessage={errorMessage}
        labelText={t.settingsPage.infoForm.dateBirth}
        name={'dateOfBirth'}
        setErrorMessage={setErrorMessage}
      />
      {/*<div className={s.dateOfBirthWrapper}>*/}
      {/*  <Typography className={s.labelColor} variant={'regular-text-14'}>*/}
      {/*    {t.settingsPage.infoForm.dateBirth}*/}
      {/*  </Typography>*/}

      {/*  <MyDatePicker*/}
      {/*    {...register('dateOfBirth')}*/}
      {/*    defaultSingleValue={dateOfBirth}*/}
      {/*    errorMessage={errorMessage}*/}
      {/*    locale={t.locale}*/}
      {/*    mode={'single'}*/}
      {/*    onDateChange={handleDateChange}*/}
      {/*  />*/}
      {/*{errorMessage && (*/}
      {/*  <div className={s.errorDiv}>*/}
      {/*    <Typography variant={'regular-text-14'}>{errorMessage}</Typography>*/}
      {/*    <Link*/}
      {/*      href={`${PATH.AUTH.PRIVACYPOLICY}?previousPath=${encodeURIComponent(currentPath)}`}*/}
      {/*    >*/}
      {/*      <Typography className={s.linkPrivacy} variant={'small-link'}>*/}
      {/*        {t.settingsPage.infoForm.privacyPol}*/}
      {/*      </Typography>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*</div>*/}

      <CountryCitySelect
        defaultCityValue={city}
        defaultCountryValue={country}
        defaultStateValue={region}
        onCityChange={cityName => setValue('city', cityName)}
        onCountryChange={countryName => setValue('country', countryName)}
        onStateChange={stateName => setValue('region', stateName)}
      />

      <div>
        <TextArea
          {...register('aboutMe')}
          placeholder={t.settingsPage.infoForm.textAreaPlace}
          textAreaLabelText={t.settingsPage.infoForm.textArea}
        />
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
