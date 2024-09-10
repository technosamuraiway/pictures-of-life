import { useState } from 'react'

import { EmailSentModal, ForgotPasswordForm, ForgotPasswordFormValues } from '@/entities'
import { IMessagesFromError, IServerError, useForgotPasswordMutation } from '@/services'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Card, Typography } from '@technosamurai/techno-ui-kit'

import s from './ForgotPassword.module.scss'

export default function ForgotPassword() {
  const t = useRouterLocaleDefinition()
  const [openModal, setOpenModal] = useState(false)
  const [sentLinkAgain, setSentLinkAgain] = useState(false)

  const [email, setEmail] = useState('YourEmail@gmail.com')
  const [textFieldError, setTextFieldError] = useState<Array<IMessagesFromError>>()

  const [forgotPassword, { isLoading: forgotPasswordIsLoading }] = useForgotPasswordMutation()

  const forgotPasswordSubmitHandler = (data: ForgotPasswordFormValues) => {
    setEmail(data.email)

    forgotPassword({ email: data.email, recaptcha: data.recaptcha })
      .unwrap()
      .then(() => {
        setOpenModal(true)
      })
      .catch((err: IServerError) => {
        if (err.data) {
          setTextFieldError(err.data.messages)
        }
      })
  }

  const onClickCloseModalHandler = () => {
    setOpenModal(false)
    setSentLinkAgain(true)
  }

  return (
    <>
      {forgotPasswordIsLoading && <RequestLineLoader />}
      <MetaHead title={t.forgotPasswordPage.title} />
      <Card className={s.wrapper}>
        <Typography className={s.mainTitle} variant={'h1'}>
          {t.forgotPasswordPage.title}
        </Typography>
        <ForgotPasswordForm
          isButtonDisabled={forgotPasswordIsLoading}
          isSendLinkAgain={sentLinkAgain}
          onSubmitForgotPasswordForm={forgotPasswordSubmitHandler}
          textFieldError={textFieldError}
        />
      </Card>
      <EmailSentModal
        email={email}
        isOpen={openModal}
        onClickCloseModal={onClickCloseModalHandler}
      />
    </>
  )
}
