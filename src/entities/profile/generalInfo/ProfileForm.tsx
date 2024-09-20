import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { PATH } from '@/shared'
import CitySelector from '@/shared/components/CountryCitySelect/CitySelect/CitySelect'
import CountrySelector from '@/shared/components/CountryCitySelect/CountrySelect/CountrySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MyDatePicker, Select, SelectBox, TextArea } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
// Убедитесь, что путь правильный
import { z } from 'zod'

import s from './ProfileForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

// Определяем схему валидации с помощью Zod
const profileSchema = z.object({
  aboutMe: z.string().optional(),
  city: z.string().min(1, 'Please select a city'),
  country: z.string().min(1, 'Please select a country'),
  dateOfBirth: z.date(), // Убедитесь, что это поле включено
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
  const [selectedCountry, setSelectedCountry] = useState(0)
  const [selectedState, setSelectedState] = useState(0)
  const [selectedCity, setSelectedCity] = useState(0)
  // const [errorMessage, setErrorMessage] = useState('')

  const checkAge = (birthDate: Date) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }

    return age
  }
  const [errorMessage, setErrorMessage] = useState('')
  const handleDateChange = ({ start }: { start?: Date }) => {
    if (!start) {
      return
    } // Если start не указан, выходим из функции

    // Проверка возраста
    if (checkAge(start) < 13) {
      setErrorMessage('A user under 13 cannot create a profile.')

      return
    }
    setErrorMessage('') // Сбрасываем сообщение об ошибке
  }

  const onSubmitFormHandler = (data: ProfileFormValues) => {
    onSubmitProfileForm(data, reset)
  }

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <label>
        <span>
          Username <span style={{ color: 'red' }}>*</span>
        </span>
      </label>
      <ControlledTextField
        autoComplete={'username'}
        control={control}
        name={'username'}
        type={'text'}
      />
      <label>
        <span>
          First Name <span style={{ color: 'red' }}>*</span>
        </span>
      </label>
      <ControlledTextField
        autoComplete={'first-name'}
        control={control}
        name={'firstName'}
        type={'text'}
      />
      <label>
        <span>
          Last Name <span style={{ color: 'red' }}>*</span>
        </span>
      </label>
      <ControlledTextField
        autoComplete={'last-name'}
        control={control}
        name={'lastName'}
        type={'text'}
      />

      <div className={s.dateOfBirthWrapper}>
        <label>Date of Birth</label>
        <MyDatePicker locale={'en'} mode={'single'} onDateChange={handleDateChange} />
        {errorMessage && (
          <div style={{ color: 'red' }}>
            {errorMessage}
            <Link href={PATH.AUTH.PRIVACYPOLICY}>Privacy Policy</Link>
          </div>
        )}
      </div>
      <div className={s.selectDiv}>
        <CountrySelector onCountryChange={setSelectedCountry} />

        <CitySelector
          countryId={selectedCountry}
          onCityChange={setSelectedCity}
          stateId={selectedState}
        />
      </div>

      <label>About me</label>
      <TextArea name={'aboutMe'} placeholder={'Tell us something about yourself...'} />

      <Button className={s.submitButton} disabled={buttonDisabled} type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
