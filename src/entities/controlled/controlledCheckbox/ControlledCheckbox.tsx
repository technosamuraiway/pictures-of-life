import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@technosamurai/techno-ui-kit'

import s from './ControlledCheckbox.module.scss'

type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'onChange' | 'onCheckedChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <Checkbox
      {...field}
      {...rest}
      checked={value}
      className={error && s.error}
      onCheckedChange={onChange}
    />
  )
}
