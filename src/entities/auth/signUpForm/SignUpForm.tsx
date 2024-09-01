import { useForm } from 'react-hook-form'

import { useZodValidation } from '@/entities'
import { ControlledCheckbox } from '@/entities/_components/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '@/entities/_components/controlledTextField/ControlledTextField'
import { Trans } from '@/shared/components/trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { PATH } from '@/shared/utils/pathVariables'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

interface IProps {
  buttonDisabled: boolean
  onSubmit: (data: any) => void
}

export const SignUpForm = ({ buttonDisabled, onSubmit }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { authSchemes, values } = useZodValidation()

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<typeof values.signUp>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      isAgree: false,
      password: '',
      username: '',
    },
    resolver: zodResolver(authSchemes.signUp),
  })

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                <Typography as={Link} href={PATH.TERMSOFSRVICE} variant={'regular-link'}>
                  {t.signUpPage.serviceLink}
                </Typography>
              ),
              2: () => (
                <Typography as={Link} href={PATH.PRIVACYPOLICY} variant={'regular-link'}>
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
