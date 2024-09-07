import { Confirmation, EmailSentModal } from '@/entities'
import { useRouterLocaleDefinition } from '@/shared'
import pngExpired from '@public/confirmEmail/expiredConfirm.png'
import { useRouter } from 'next/router'

interface IProps {
  isButtonDisable: boolean
  isOpenModal: boolean
  onClickCloseModal: () => void
  onResendButtonClick: () => void
}

export const ResendLink = ({
  isButtonDisable,
  isOpenModal,
  onClickCloseModal,
  onResendButtonClick,
}: IProps) => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()

  return (
    <>
      <Confirmation
        buttonText={t.expiredEmailLink.buttonText}
        imgAltText={t.expiredEmailLink.imgAltText}
        imgHeight={352}
        imgPngSrc={pngExpired}
        imgWidth={473}
        isButtonDisable={isButtonDisable}
        mainText={t.expiredEmailLink.mainText}
        onButtonClick={onResendButtonClick}
        pageHeader={t.expiredEmailLink.pageHeader}
        pageTitle={t.expiredEmailLink.title}
      />
      {query.email && (
        <EmailSentModal
          email={query.email}
          isOpen={isOpenModal}
          onClickCloseModal={onClickCloseModal}
        />
      )}
    </>
  )
}
