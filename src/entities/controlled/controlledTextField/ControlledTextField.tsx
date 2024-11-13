import { KeyboardEvent } from 'react'
import {
  FieldValues,
  Path,
  UseControllerProps,
  UseFormSetError,
  useController,
} from 'react-hook-form'

import { TEXT_FIELDS, useRouterLocaleDefinition } from '@/shared'
import { TextField, TextFieldProps, Typography } from '@technosamurai/techno-ui-kit'

import s from './ControlledTextField.module.scss'

type ControlledTextFieldProps<T extends FieldValues> = {
  setError?: UseFormSetError<T>
} & Omit<TextFieldProps, 'id' | 'onBlur' | 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  error: errorField,
  name,
  rules,
  setError,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const t = useRouterLocaleDefinition()
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (name ? TEXT_FIELDS.includes(name) : false) {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        setError &&
          setError(name as Path<T>, {
            message: t.validationSchemes.noStartingSpace,
            type: 'manual',
          })
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
