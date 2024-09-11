import { useForm } from 'react-hook-form'

import {
  CreateNewPasswordFormValues,
  ICreateNewPassword,
  createNewPasswordScheme,
} from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'

import s from './CreateNewPasswordForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  isButtonDisabled: boolean
  onSubmitCreateNewPasswordForm: (data: CreateNewPasswordFormValues) => void
}

export const CreateNewPasswordForm = ({
  isButtonDisabled,
  onSubmitCreateNewPasswordForm,
}: IProps) => {
  const t = useRouterLocaleDefinition()

  const signUpTranslate: ICreateNewPassword = {
    confirmPassword: t.validationSchemes.confirmPassword,
    newPassword: {
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
      password: t.validationSchemes.password,
    },
  }

  const { control, handleSubmit } = useForm<CreateNewPasswordFormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createNewPasswordScheme(signUpTranslate)),
  })

  return (
    <form
      className={s.formWrapper}
      noValidate
      onSubmit={handleSubmit(onSubmitCreateNewPasswordForm)}
    >
      <ControlledTextField
        autoComplete={'recovery'}
        control={control}
        label={t.newPasswordPage.newPassword}
        maxLength={21}
        name={'newPassword'}
        type={'password'}
      />
      <ControlledTextField
        autoComplete={'recovery'}
        control={control}
        label={t.newPasswordPage.passwordConfirmation}
        name={'confirmPassword'}
        type={'password'}
      />
      <Typography className={s.mainText} variant={'regular-text-14'}>
        {t.newPasswordPage.mainText}
      </Typography>
      <Button disabled={isButtonDisabled} type={'submit'}>
        {t.newPasswordPage.buttonText}
      </Button>
    </form>
  )
}
