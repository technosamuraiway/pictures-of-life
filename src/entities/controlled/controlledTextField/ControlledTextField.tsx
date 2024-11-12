import React from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps, Typography } from '@technosamurai/techno-ui-kit'

import s from './ControlledTextField.module.scss'

const InputTypes = {
  CYRILLIC_AND_LATIN: 'cyrillic_and_latin',
  LETTERS_ONLY: 'letters_only',
  NUMERIC: 'numeric',
  PASSWORD: 'password',
  SEARCH: 'search',
  TEXT: 'text',
} as const

type ControlledTextFieldProps<T extends FieldValues> = {
  inputType?: (typeof InputTypes)[keyof typeof InputTypes]
  setError?: any
} & Omit<TextFieldProps, 'id' | 'onBlur' | 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  error: errorField,
  inputType = InputTypes.TEXT,
  name,
  rules,
  setError,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (name ? 'email'.includes(name) : false) {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        setError('email', { message: 'Space 123', type: 'manual' })
      }
    }
  }

  return (
    <div className={s.wrapper}>
      <TextField
        onKeyDown={handleKeyDown}
        {...field}
        {...{ ...rest, id: name, onChange, value }}
        inputClassName={(error || errorField) && s.textField}
      />
      {(error || errorField) && (
        <Typography className={s.error} variant={'small-text'}>
          {error?.message || errorField}
        </Typography>
      )}
    </div>
  )
}
