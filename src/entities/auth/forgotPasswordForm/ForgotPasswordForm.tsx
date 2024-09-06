import { useForm } from 'react-hook-form'

import { ForgotPasswordFormValues, IForgotPassword, forgotPasswordScheme } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import recaptchaImg from '@public/recaptcha.png'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import { ControlledCheckbox } from '../../controlled/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

export const ForgotPasswordForm = () => {
  const t = useRouterLocaleDefinition()

  const signUpTranslate: IForgotPassword = {
    email: {
      emailRequired: t.validationSchemes.emailRequired,
      emailScheme: t.validationSchemes.emailScheme,
    },
  }

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
      isRobot: false,
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordScheme(signUpTranslate)),
  })

  const onSubmitFormHandler = (data: ForgotPasswordFormValues) => {
    //console.log(data)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitFormHandler)}>
      <ControlledTextField
        control={control}
        label={t.forgotPasswordPage.email}
        maxLength={31}
        name={'email'}
        type={'email'}
      />
      <Typography className={s.mainText} variant={'regular-text-14'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button disabled={false} type={'submit'}>
        Send Link
      </Button>

      <Button as={Link} href={'/'} variant={'textButton'}>
        Back to si
      </Button>

      <div>
        <ControlledCheckbox control={control} name={'isRobot'} />
        <Typography variant={'small-text'}>I am not</Typography>
        <Image alt={'recaptcha - picture'} src={recaptchaImg} />
      </div>
    </form>
  )
}
