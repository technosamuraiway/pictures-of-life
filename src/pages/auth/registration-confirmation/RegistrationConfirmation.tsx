import { useEffect, useState } from 'react'

import { Confirmation } from '@/entities'
import { useConfirmEmailMutation, useResendConfirmEmailMutation } from '@/services'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { PATH } from '@/shared/utils/pathVariables'
import pngExpired from '@public/confirmEmail/expiredConfirm.png'
import pngSuccess from '@public/confirmEmail/successConfirm.png'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()

  const [confirmResult, setConfirmResult] = useState(false)

  const [confirmEmail] = useConfirmEmailMutation()
  const [resendLink, { isLoading: resendLinkIsLoading }] = useResendConfirmEmailMutation()

  useEffect(() => {
    if (router.query.code) {
      confirmEmail({ confirmationCode: router.query.code })
        .unwrap()
        .then(() => {
          setConfirmResult(true)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const expiredLinkButtonClickHandler = async () => {
    try {
      if (router.query.email) {
        await resendLink({ email: router.query.email }).unwrap()
      }
    } catch (e) {
      await router.replace(PATH.AUTH.SIGNIN)
    }
  }

  const successButtonClickHandler = () => {
    router.replace(PATH.AUTH.SIGNIN)
  }

  return (
    <>
      {confirmResult ? (
        <Confirmation
          buttonText={t.successConfirmEmail.buttonText}
          imgAltText={t.successConfirmEmail.imgAltText}
          imgHeight={300}
          imgPngSrc={pngSuccess}
          imgWidth={432}
          mainText={t.successConfirmEmail.mainText}
          onButtonClick={successButtonClickHandler}
          pageHeader={t.successConfirmEmail.pageHeader}
          pageTitle={t.successConfirmEmail.title}
        />
      ) : (
        <Confirmation
          buttonDisable={resendLinkIsLoading}
          buttonText={t.expiredEmailLink.buttonText}
          imgAltText={t.expiredEmailLink.imgAltText}
          imgHeight={352}
          imgPngSrc={pngExpired}
          imgWidth={473}
          mainText={t.expiredEmailLink.mainText}
          onButtonClick={expiredLinkButtonClickHandler}
          pageHeader={t.expiredEmailLink.pageHeader}
          pageTitle={t.expiredEmailLink.title}
        />
      )}
    </>
  )
}
