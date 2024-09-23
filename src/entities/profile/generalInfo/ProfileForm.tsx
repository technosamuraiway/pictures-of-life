import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PATH } from '@/shared'
import CountryCitySelector from '@/shared/components/CountryCitySelect/CountryCitySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MyDatePicker, TextArea, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { z } from 'zod'

import s from './ProfileForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

const profileSchema = z.object({
  aboutMe: z.string().optional(),
  city: z.string().min(1, 'Please select a city'),
  country: z.string().min(1, 'Please select a country'),
  dateOfBirth: z.date(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface IProps {
  buttonDisabled: boolean
  onSubmitProfileForm: (data: ProfileFormValues, resetForm: () => void) => void
}

export const ProfileForm = ({ buttonDisabled, onSubmitProfileForm }: IProps) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      username: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const [selectedCountry, setSelectedCountry] = useState<null | number>(null)
  const [selectedCity, setSelectedCity] = useState<null | number>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const checkAge = (birthDate: Date) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age
  }

  const handleDateChange = ({ start }: { start?: Date }) => {
    if (!start) {
      return
    }
    if (checkAge(start) < 13) {
      setErrorMessage('A user under 13 cannot create a profile.')

      return
    }
    setErrorMessage('')
  }

  const handleCountryChange = (countryId: number) => {
    setSelectedCountry(countryId)
    setValue('country', countryId.toString())
  }

  const handleCityChange = (cityId: number) => {
    setSelectedCity(cityId)
    setValue('city', cityId.toString())
  }

  const onSubmitFormHandler = (data: ProfileFormValues) => {
    onSubmitProfileForm(data, reset)
  }

  const username = watch('username')
  const firstName = watch('firstName')
  const lastName = watch('lastName')

  const isButtonDisabled = !username || !firstName || !lastName

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <div className={s.spanDiv}>
        <span className={s.span}>*</span>
        <ControlledTextField
          autoComplete={'username'}
          control={control}
          label={'Username'}
          name={'username'}
          type={'text'}
        />
      </div>

      <div className={s.spanDiv}>
        <span className={s.span}>*</span>
        <ControlledTextField
          autoComplete={'first-name'}
          control={control}
          label={'First Name'}
          name={'firstName'}
          type={'text'}
        />
      </div>

      <div className={s.spanDiv}>
        <span className={s.span}>*</span>
        <ControlledTextField
          autoComplete={'last-name'}
          control={control}
          label={'Last Name'}
          name={'lastName'}
          type={'text'}
        />
      </div>

      <div className={s.dateOfBirthWrapper}>
        <label className={s.labelDate}>
          <Typography variant={'regular-text-14'}>Date of Birth</Typography>
        </label>
        <MyDatePicker locale={'en'} mode={'single'} onDateChange={handleDateChange} />
        {errorMessage && (
          <div style={{ color: 'red' }}>
            {errorMessage}
            <Link href={PATH.AUTH.PRIVACYPOLICY}>Privacy Policy</Link>
          </div>
        )}
      </div>
      <div className={s.selectDiv}>
        <CountryCitySelector
          onCityChange={handleCityChange}
          onCountryChange={handleCountryChange}
        />
      </div>
      <div>
        <label className={s.labelDate}>
          <Typography variant={'regular-text-14'}>About me</Typography>
        </label>
        <TextArea name={'aboutMe'} placeholder={'Tell us something about yourself...'} />
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
