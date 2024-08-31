import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps, Typography } from '@technosamurai/techno-ui-kit'

import s from './ControlledTextField.module.scss'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'error' | 'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
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

  return (
    <div className={s.wrapper}>
      <TextField {...field} {...{ ...rest, id: name, onChange, value }} />
      {error && (
        <Typography className={s.error} variant={'small-text'}>
          {error.message}
        </Typography>
      )}
    </div>
  )
}
