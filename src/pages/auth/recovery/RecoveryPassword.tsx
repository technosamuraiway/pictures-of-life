import { useEffect } from 'react'

import { Confirmation } from '@/entities'
import { useCheckRecoveryCodeMutation } from '@/services'
import { PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { NewPassword } from '@/widgets'
import pngExpired from '@public/confirmEmail/expiredConfirm.png'
import { useRouter } from 'next/router'

export default function RecoveryPassword() {
  const t = useRouterLocaleDefinition()
  const { query, replace } = useRouter()

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

  const onResendButtonClickHandler = () => {
    replace(PATH.AUTH.FORGOTPASSWORD)
  }

  return (
    <>
      {checkRecoveryCodeIsLoading && <RequestLineLoader />}

      {checkRecoveryCodeIsSuccess && <NewPassword />}
      {checkRecoveryCodeIsError && (
        <Confirmation
          buttonText={t.expiredEmailLink.buttonPasswordVerificationText}
          imgAltText={t.expiredEmailLink.imgAltText}
          imgHeight={352}
          imgPngSrc={pngExpired}
          imgWidth={473}
          mainText={t.expiredEmailLink.mainText}
          onButtonClick={onResendButtonClickHandler}
          pageHeader={t.expiredEmailLink.passwordVerificationPageHeader}
          pageTitle={t.expiredEmailLink.title}
        />
      )}
    </>
  )
}
