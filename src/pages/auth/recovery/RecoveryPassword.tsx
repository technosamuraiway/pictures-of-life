import { useEffect, useState } from 'react'

import { useCheckRecoveryCodeMutation } from '@/services'
import { PATH, RequestLineLoader } from '@/shared'
import { NewPassword, ResendLink } from '@/widgets'
import { useRouter } from 'next/router'

export default function RecoveryPassword() {
  const { query, replace } = useRouter()
  const [openModal, setOpenModal] = useState(false)

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

  const onClickCloseModalHandler = () => {
    setOpenModal(false)
    replace(PATH.AUTH.SIGNIN)
  }

  const onResendButtonClickHandler = () => {}

  return (
    <>
      {checkRecoveryCodeIsLoading && <RequestLineLoader />}

      {checkRecoveryCodeIsSuccess && <NewPassword />}
      {checkRecoveryCodeIsError && (
        <ResendLink
          isButtonDisable={false}
          isOpenModal={openModal}
          onClickCloseModal={onClickCloseModalHandler}
          onResendButtonClick={onResendButtonClickHandler}
        />
      )}
    </>
  )
}
