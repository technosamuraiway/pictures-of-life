import { useForm } from 'react-hook-form'

import { useZodValidation } from '@/entities'
import { PATH, Trans, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { ControlledCheckbox } from '../../controlled/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  buttonDisabled: boolean
  onSubmit: (data: any, resetForm: () => void) => void
}

export const SignUpForm = (props: IProps) => {
  const { buttonDisabled, onSubmit } = props

  const t = useRouterLocaleDefinition()
  const { authSchemes, values } = useZodValidation()

  const { control, handleSubmit, reset } = useForm<typeof values.signUp>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      isAgree: false,
      password: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(authSchemes.signUp),
  })

  const onSubmitFormHandler = (data: typeof values.signUp) => {
    onSubmit(data, reset)
  }

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <ControlledTextField
        control={control}
        label={t.signUpPage.username}
        maxLength={31}
        name={'username'}
        type={'text'}
      />
      <ControlledTextField
        autoComplete={'email'}
        control={control}
        label={t.signUpPage.email}
        name={'email'}
        type={'email'}
      />
      <ControlledTextField
        autoComplete={'new-password'}
        control={control}
        label={t.signUpPage.password}
        maxLength={21}
        name={'password'}
        type={'password'}
      />
      <ControlledTextField
        autoComplete={'new-password'}
        control={control}
        label={t.signUpPage.passwordConfirmation}
        name={'confirmPassword'}
        type={'password'}
      />
      <div className={s.checkBoxWrapper}>
        <ControlledCheckbox control={control} name={'isAgree'} />
        <Typography variant={'small-text'}>
          <Trans
            tags={{
              1: () => (
                <Typography as={Link} href={PATH.AUTH.TERMSOFSRVICE} variant={'regular-link'}>
                  {t.signUpPage.serviceLink}
                </Typography>
              ),
              2: () => (
                <Typography as={Link} href={PATH.AUTH.PRIVACYPOLICY} variant={'regular-link'}>
                  {t.signUpPage.policyLink}
                </Typography>
              ),
            }}
            text={t.signUpPage.serviceAndPolicyAgreement}
          />
        </Typography>
      </div>
      <Button className={s.submitButton} disabled={buttonDisabled} type={'submit'}>
        {t.signUpPage.title}
      </Button>
    </form>
  )
}
