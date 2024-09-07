import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Confirmation,
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
  EmailSentModal,
} from '@/entities'
import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from '@/services'
import { MetaHead, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import pngExpired from '@public/confirmEmail/expiredConfirm.png'
import { Card, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './NewPassword.module.scss'

export default function NewPassword() {
  const t = useRouterLocaleDefinition()

  const { query, replace } = useRouter()

  const [openModal, setOpenModal] = useState(false)

  const [createNewPassword, { isLoading: createNewPasswordIsLoading }] =
    useCreateNewPasswordMutation()

  const [
    checkRecoveryCode,
    {
      isError: checkRecoveryCodeIsError,
      isLoading: checkRecoveryCodeIsLoading,
      isSuccess: checkRecoveryCodeIsSuccess,
    },
  ] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    if (query.code) {
      checkRecoveryCode({ recoveryCode: query.code })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.code])

  const createNewPasswordSubmitHandler = (data: CreateNewPasswordFormValues) => {
    if (query.code) {
      createNewPassword({ newPassword: data.newPassword, recoveryCode: query.code }).unwrap()
      toast(t.newPasswordPage.successMessage)
      replace(PATH.AUTH.SIGNIN)
    }
  }

  const onClickCloseModalHandler = () => {
    setOpenModal(false)
    replace(PATH.AUTH.SIGNIN)
  }

  return (
    <>
      {(checkRecoveryCodeIsLoading || createNewPasswordIsLoading) && <RequestLineLoader />}

      {checkRecoveryCodeIsSuccess && (
        <>
          <MetaHead title={t.newPasswordPage.title} />
          <Card className={s.wrapper}>
            <Typography className={s.mainTitle} variant={'h1'}>
              {t.newPasswordPage.title}
            </Typography>
            <CreateNewPasswordForm
              isButtonDisabled={createNewPasswordIsLoading}
              onSubmitCreateNewPasswordForm={createNewPasswordSubmitHandler}
            />
          </Card>
        </>
      )}
      {checkRecoveryCodeIsError && (
        <>
          <Confirmation
            buttonDisable={false}
            buttonText={t.expiredEmailLink.buttonText}
            imgAltText={t.expiredEmailLink.imgAltText}
            imgHeight={352}
            imgPngSrc={pngExpired}
            imgWidth={473}
            mainText={t.expiredEmailLink.mainText}
            onButtonClick={() => {}}
            pageHeader={t.expiredEmailLink.pageHeader}
            pageTitle={t.expiredEmailLink.title}
          />
          {query.email && (
            <EmailSentModal
              email={query.email}
              isOpen={openModal}
              onClickCloseModal={onClickCloseModalHandler}
            />
          )}
        </>
      )}
    </>
  )
}
