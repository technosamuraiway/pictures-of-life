import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ControlledSingleCalendar,
  ControlledTextField,
  IProfile,
  ProfileFormValues,
  profileValidationScheme,
} from '@/entities'
import { useGetProfileQuery } from '@/services'
import { CountryCitySelect, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextArea } from '@technosamurai/techno-ui-kit'

import s from './ProfileForm.module.scss'

interface IProps {
  buttonDisabled: boolean
  onSubmitProfileForm: (data: ProfileFormValues) => Promise<void>
}

export const ProfileForm = ({ buttonDisabled, onSubmitProfileForm }: IProps) => {
  const t = useRouterLocaleDefinition()

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

  const { control, handleSubmit, register, reset, setError, setValue, watch } =
    useForm<ProfileFormValues>({
      defaultValues: {
        aboutMe: '',
        city: '',
        country: '',
        dateOfBirth: undefined,
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
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        region: profileData.region || '',
        userName: profileData.userName || '',
      })
    }
  }, [profileData, reset])

  const onSubmitFormHandler = async (data: ProfileFormValues) => {
    await onSubmitProfileForm(data)
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
        setError={setError}
        type={'text'}
        withStar
      />
      <ControlledTextField
        autoComplete={'first-name'}
        control={control}
        label={t.settingsPage.infoForm.firstName}
        name={'firstName'}
        setError={setError}
        type={'text'}
        withStar
      />
      <ControlledTextField
        autoComplete={'last-name'}
        control={control}
        label={t.settingsPage.infoForm.lastName}
        name={'lastName'}
        setError={setError}
        type={'text'}
        withStar
      />

      <ControlledSingleCalendar
        control={control}
        errorMessage={errorMessage}
        labelText={t.settingsPage.infoForm.dateBirth}
        name={'dateOfBirth'}
        setErrorMessage={setErrorMessage}
      />

      <CountryCitySelect
        defaultCityValue={watch('city')}
        defaultCountryValue={watch('country')}
        defaultStateValue={watch('region')}
        onCityChange={cityName => setValue('city', cityName)}
        onCountryChange={countryName => setValue('country', countryName)}
        onStateChange={stateName => setValue('region', stateName)}
      />
      <TextArea
        {...register('aboutMe')}
        placeholder={t.settingsPage.infoForm.textAreaPlace}
        textAreaLabelText={t.settingsPage.infoForm.textArea}
      />
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
