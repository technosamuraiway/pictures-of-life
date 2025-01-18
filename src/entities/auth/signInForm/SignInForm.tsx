import { useForm } from 'react-hook-form'

import { ISignIn, SignInFormValues, signInScheme } from '@/entities'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './SignInForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled?: boolean
  onSubmitSignInForm: (data: SignInFormValues) => void
  textFieldError?: string
}

export const SignInForm = ({ buttonDisabled, onSubmitSignInForm, textFieldError }: IProps) => {
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

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInScheme(signInTranslate)),
  })

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitSignInForm)}>
      <ControlledTextField
        autoComplete={'email'}
        className={s.input}
        control={control}
        error={textFieldError}
        label={t.signInPage.email}
        name={'email'}
        setError={setError}
        type={'email'}
      />
      <ControlledTextField
        autoComplete={'current-password'}
        className={s.input}
        control={control}
        error={textFieldError}
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

      <Button className={s.input} disabled={buttonDisabled || !isValid || !isDirty} type={'submit'}>
        {t.signInPage.signInButton}
      </Button>
    </form>
  )
}
