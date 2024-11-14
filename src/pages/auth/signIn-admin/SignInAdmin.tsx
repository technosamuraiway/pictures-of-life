import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ControlledTextField, ISignIn, SignInFormValues } from '@/entities'
import { signInAdminScheme } from '@/entities/zodValidationScheme'
import { LOGIN_ADMIN } from '@/services/graphql/mutations/user'
import { useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './SignInAdmin.module.scss'

function SignInAdmin() {
  const [textFieldError, setTextFieldError] = useState<string>()

  const router = useRouter()

  const t = useRouterLocaleDefinition()

  const [loginAdmin] = useMutation(LOGIN_ADMIN)

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
    reset,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInAdminScheme(signInTranslate)),
  })

  const onSubmitSignInForm = async (data: SignInFormValues) => {
    try {
      const response = await loginAdmin({
        variables: {
          email: data.email,
          password: data.password,
        },
      })

      if (response?.data.loginAdmin?.logged) {
        toast.success(t.signInPage.successLogIn)
        reset()
        sessionStorage.setItem('verificationAdmin', response?.data.loginAdmin?.logged)
        router.push('/admin')
      } else {
        reset()
        toast.error(t.signInAdminPage.errorLogIn)
      }
    } catch (err: any) {
      if (err.data) {
        setTextFieldError('The email or password are incorrect. Try again please')
      }
    }
  }

  return (
    <Card className={s.cardContainer}>
      <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitSignInForm)}>
        <Typography variant={'h1'}>{t.signInPage.title}</Typography>
        <ControlledTextField
          autoComplete={'email'}
          control={control}
          error={textFieldError}
          label={t.signInPage.email}
          name={'email'}
          type={'email'}
        />
        <ControlledTextField
          autoComplete={'current-password'}
          control={control}
          error={textFieldError}
          label={t.signInPage.password}
          name={'password'}
          type={'password'}
        />
        <Button disabled={!isValid || !isDirty} type={'submit'}>
          {t.signInPage.signInButton}
        </Button>
      </form>
    </Card>
  )
}
SignInAdmin.getLayout = getBaseLayout
export default SignInAdmin
