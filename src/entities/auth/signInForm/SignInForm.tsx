import { useForm } from 'react-hook-form'

import { ISignIn, SignInFormValues, signInScheme } from '@/entities/zodValidationScheme'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './SignInForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled: boolean
  onSubmitSignInForm: (data: SignInFormValues, resetForm: () => void) => void
}

export const SignInForm = ({ buttonDisabled, onSubmitSignInForm }: IProps) => {
  const t = useRouterLocaleDefinition()

  const signInTranslate: ISignIn = {
    email: {
      emailRequired: t.validationSchemes.emailRequired,
      emailScheme: t.validationSchemes.emailScheme,
    },
    password: {
      maximumNumber: t.validationSchemes.maximumNumber,
      minimumNumber: t.validationSchemes.minimumNumber,
      password: t.validationSchemes.password,
    },
  }

  const { control, handleSubmit, reset } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInScheme(signInTranslate)),
  })

  const onSubmitFormHandler = (data: SignInFormValues) => {
    onSubmitSignInForm(data, reset)
  }

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <ControlledTextField
        autoComplete={'email'}
        control={control}
        label={t.signInPage.email}
        name={'email'}
        type={'email'}
      />
      <ControlledTextField
        autoComplete={'current-password'}
        control={control}
        label={t.signInPage.password}
        name={'password'}
        type={'password'}
      />

      <Typography
        as={Link}
        className={s.forgotPassword}
        href={PATH.AUTH.FORGOTPASSWORD}
        variant={'medium-text-14'}
      >
        {t.signInPage.forgotPassword}
      </Typography>

      <Button className={s.submitButton} disabled={buttonDisabled} type={'submit'}>
        {t.signInPage.signInButton}
      </Button>
    </form>
  )
}