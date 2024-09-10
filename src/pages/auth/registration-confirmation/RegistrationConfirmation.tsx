import { useEffect, useState } from 'react'

import { Confirmation } from '@/entities'
import { useConfirmEmailMutation, useResendConfirmEmailMutation } from '@/services'
import { PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { ResendLink } from '@/widgets'
import pngSuccess from '@public/confirmEmail/successConfirm.png'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const t = useRouterLocaleDefinition()
  const { query, replace } = useRouter()
  const [openModal, setOpenModal] = useState(false)

  const [
    confirmEmail,
    {
      isError: confirmEmailIsError,
      isLoading: confirmEmailIsLoading,
      isSuccess: confirmEmailIsSuccess,
    },
  ] = useConfirmEmailMutation()
  const [resendLink, { isLoading: resendLinkIsLoading }] = useResendConfirmEmailMutation()

  useEffect(() => {
    if (query.code) {
      confirmEmail({ confirmationCode: query.code })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.code])

  const expiredLinkButtonClickHandler = async () => {
    try {
      if (query.email) {
        await resendLink({ email: query.email }).unwrap()
        setOpenModal(true)
      }
    } catch (e) {
      await replace(PATH.AUTH.SIGNIN)
    }
  }

  const onClickRedirectToSignIn = () => {
    replace(PATH.AUTH.SIGNIN)
  }

  return (
    <>
      {(confirmEmailIsLoading || resendLinkIsLoading) && <RequestLineLoader />}
      {confirmEmailIsSuccess && (
        <Confirmation
          buttonText={t.successConfirmEmail.buttonText}
          imgAltText={t.successConfirmEmail.imgAltText}
          imgHeight={300}
          imgPngSrc={pngSuccess}
          imgWidth={432}
          mainText={t.successConfirmEmail.mainText}
          onButtonClick={onClickRedirectToSignIn}
          pageHeader={t.successConfirmEmail.pageHeader}
          pageTitle={t.successConfirmEmail.title}
        />
      )}
      {confirmEmailIsError && (
        <ResendLink
          isButtonDisable={resendLinkIsLoading}
          isOpenModal={openModal}
          onClickCloseModal={onClickRedirectToSignIn}
          onResendButtonClick={expiredLinkButtonClickHandler}
        />
      )}
    </>
  )
}
