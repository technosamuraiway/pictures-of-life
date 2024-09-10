import { useRef } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { ForgotPasswordFormValues, IForgotPassword, forgotPasswordScheme } from '@/entities'
import { IMessagesFromError } from '@/services'
import { ButtonLink, PATH, useRouterLocaleDefinition } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './ForgotPasswordForm.module.scss'

import { ControlledTextField } from '../../controlled/controlledTextField/ControlledTextField'

interface IProps {
  isButtonDisabled: boolean
  isSendLinkAgain: boolean
  onSubmitForgotPasswordForm: (data: ForgotPasswordFormValues) => void
  textFieldError?: Array<IMessagesFromError>
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

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
      recaptcha: undefined,
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordScheme(signUpTranslate)),
  })

  const onRecaptchaChange = (recaptchaValue: null | string) => {
    setValue('recaptcha', recaptchaValue || '', { shouldValidate: true })
  }
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const onSubmitForgotPasswordFormHandler = (data: ForgotPasswordFormValues) => {
    onSubmitForgotPasswordForm(data)
    recaptchaRef.current?.reset()
  }

  const errorEmail =
    textFieldError && (textFieldError[0].field === 'email' ? textFieldError[0].message : undefined)

  return (
    <form
      className={s.formWrapper}
      noValidate
      onSubmit={handleSubmit(onSubmitForgotPasswordFormHandler)}
    >
      <ControlledTextField
        control={control}
        error={errorEmail}
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
      <div className={s.recaptchaWrapper}>
        <ReCAPTCHA
          aria-required
          className={clsx(s.recaptcha, isButtonDisabled && s.disableRecaptcha)}
          onChange={onRecaptchaChange}
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          size={'normal'}
          theme={'dark'}
        />
        {(errors.recaptcha || (textFieldError && textFieldError[0].field === 'recaptcha')) && (
          <Typography className={s.recaptchaError} variant={'regular-text-14'}>
            {errors.recaptcha?.message || (textFieldError && textFieldError[0].message)}
          </Typography>
        )}
      </div>
    </form>
  )
}
