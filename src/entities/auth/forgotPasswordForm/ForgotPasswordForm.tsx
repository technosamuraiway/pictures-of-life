import { useForm } from 'react-hook-form'

import { ForgotPasswordFormValues, IForgotPassword, forgotPasswordScheme } from '@/entities'
import { ButtonLink, PATH, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import recaptchaImg from '@public/recaptcha.png'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'

import s from './ForgotPasswordForm.module.scss'

import { ControlledCheckbox } from '../../controlled/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  isButtonDisabled: boolean
  isSendLinkAgain: boolean
  onSubmitForgotPasswordForm: (data: ForgotPasswordFormValues) => void
  textFieldError: string
}

export const ForgotPasswordForm = ({
  isButtonDisabled,
  isSendLinkAgain,
  onSubmitForgotPasswordForm,
  textFieldError,
}: IProps) => {
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

  return (
    <form className={s.formWrapper} noValidate onSubmit={handleSubmit(onSubmitForgotPasswordForm)}>
      <ControlledTextField
        control={control}
        error={textFieldError}
        label={t.forgotPasswordPage.email}
        maxLength={31}
        name={'email'}
        type={'email'}
      />
      <Typography className={s.mainText} variant={'regular-text-14'}>
        {t.forgotPasswordPage.mainText}
      </Typography>
      {isSendLinkAgain && (
        <Typography className={s.additionalText} variant={'regular-text-14'}>
          {t.forgotPasswordPage.additionalText}
        </Typography>
      )}
      <Button disabled={isButtonDisabled} type={'submit'}>
        {t.forgotPasswordPage.submitButtonText}
      </Button>

      <ButtonLink
        className={s.linkButton}
        linkHref={PATH.AUTH.SIGNIN}
        title={t.forgotPasswordPage.backToSignInButtonText}
      />
      {!isSendLinkAgain && (
        <div className={s.recaptchaBox}>
          <div className={s.checkBoxWrapper}>
            <ControlledCheckbox control={control} name={'isRobot'} />
            <Typography variant={'small-text'}>{t.forgotPasswordPage.recaptcha}</Typography>
          </div>
          <Image alt={'recaptcha - picture'} height={55} src={recaptchaImg} width={44} />
        </div>
      )}
    </form>
  )
}
