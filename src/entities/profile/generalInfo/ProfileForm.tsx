import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MyDatePicker, Select, SelectBox, TextArea } from '@technosamurai/techno-ui-kit'
// Убедитесь, что путь правильный
import { z } from 'zod'

import s from './ProfileForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

// Статичный список стран
const countryOptions = [
  { name: 'United States', value: 'us' },
  { name: 'Canada', value: 'ca' },
  { name: 'United Kingdom', value: 'uk' },
  { name: 'Australia', value: 'au' },
]

// Статичный список городов
const allCities = [
  { name: 'New York' },
  { name: 'Los Angeles' },
  { name: 'Toronto' },
  { name: 'London' },
  { name: 'Sydney' },
]

// Определяем схему валидации с помощью Zod
const profileSchema = z.object({
  aboutMe: z.string().optional(),
  city: z.string().min(1, 'Please select a city'),
  country: z.string().min(1, 'Please select a country'),
  dateOfBirth: z.date().refine(value => {
    const currentDate = new Date()
    const age = currentDate.getFullYear() - value.getFullYear()

    return age >= 13 // Ограничение на возраст старше 13 лет
  }, 'A user under 13 cannot create a profile. Privacy Policy'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface IProps {
  buttonDisabled: boolean
  onSubmitProfileForm: (data: ProfileFormValues, resetForm: () => void) => void
}
const formattedCityOptions = allCities.map((city, index) => ({
  label: city.name,
  value: city.name.toLowerCase().replace(/\s+/g, '-'), // Преобразуем в формат, подходящий для value
}))

export const ProfileForm = ({ buttonDisabled, onSubmitProfileForm }: IProps) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: undefined,
      firstName: '',
      lastName: '',
      username: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const [selectedCountry, setSelectedCountry] = useState('')

  const [currentValue, setCurrentValue] = useState(formattedCityOptions[0].value)

  // Устанавливаем начальное значение для города, если cityOptions не пуст

  const onSubmitFormHandler = (data: ProfileFormValues) => {
    onSubmitProfileForm(data, reset)
  }

  const dateOfBirth = watch('dateOfBirth')

  const handleDateChange = (date: { end?: Date; start?: Date }) => {
    if (date.start) {
      setValue('dateOfBirth', date.start)
    }
  }

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <ControlledTextField
        autoComplete={'username'}
        control={control}
        label={'Username'}
        name={'username'}
        type={'text'}
      />
      <ControlledTextField
        autoComplete={'first-name'}
        control={control}
        label={'First Name'}
        name={'firstName'}
        type={'text'}
      />
      <ControlledTextField
        autoComplete={'last-name'}
        control={control}
        label={'Last Name'}
        name={'lastName'}
        type={'text'}
      />

      {/* Поле для выбора даты с DatePicker */}
      <div className={s.dateOfBirthWrapper}>
        <label htmlFor={'dateOfBirth'}>Date of Birth</label>
        <MyDatePicker
          locale={'en'}
          mode={'single'}
          onDateChange={handleDateChange} // Обрабатываем выбор даты
        />
      </div>

      {/* Поле выбора страны */}
      <div className={s.selectWrapper}>
        <SelectBox
          // Если нужно, добавьте метку
          onSelectChange={value => {
            setSelectedCountry(value)
            setValue('country', value) // Обновляем значение в форме
          }}
          options={countryOptions}
          variant={'default'}
        />
      </div>

      {/* Поле выбора города */}

      <Select
        currentValue={currentValue}
        label={'Choose a city'}
        onValueChange={setCurrentValue}
        options={formattedCityOptions}
      />

      <label>About me</label>
      <TextArea name={'aboutMe'} placeholder={'Tell us something about yourself...'} />

      <Button className={s.submitButton} disabled={buttonDisabled} type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
