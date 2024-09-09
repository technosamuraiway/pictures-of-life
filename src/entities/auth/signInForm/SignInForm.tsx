import { useForm } from 'react-hook-form'

import { ISignIn, SignInFormValues, signInScheme } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './SignInForm.module.scss'

import { authService } from '../../../services/flow/auth.service'
import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled: boolean
}

export const SignInForm = ({ buttonDisabled }: IProps) => {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

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

  const { control, handleSubmit, reset, setError } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInScheme(signInTranslate)),
  })

  const [signIn] = authService.useSignInMutation()

  const onSubmitFormHandler = async (data: SignInFormValues) => {
    try {
      const result = await signIn(data).unwrap()
      const { accessToken } = result

      localStorage.setItem('accessToken', accessToken)
      reset()
      router.push('/')
    } catch (error) {
      setError('password', {
        message: 'The email or password are incorrect. Try again please',
        type: 'manual',
      })
    }
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

      <Button className={s.submitButton} disabled={buttonDisabled} type={'submit'}>
        {t.signInPage.signInButton}
      </Button>
    </form>
  )
}
