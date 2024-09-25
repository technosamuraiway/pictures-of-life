import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal } from '@/entities'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './EditPostPhotoModal.module.scss'

interface IProps {
  image: (File | string)[]
  onOpen: boolean
  setOnOpen: (onOpen: boolean) => void
}

export const EditPostPhotoModal = ({ image, onOpen, setOnOpen }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()
  const [openExitModal, setOpenExitModal] = useState<boolean>(false)

  const onCloseModalHandler = () => {
    setOpenExitModal(true)
  }

  const onModalDiscardDtnClickHandler = () => {
    setOnOpen(false)
    push(PATH.HOME)
  }

  const onDraftBtnClickHandler = () => {
    setOnOpen(false)
    toast.info('Здесь будет функционал черновиков, когда-нибудь точно появится!')
    push(PATH.HOME)
  }

  return (
    <>
      <Modal
        contentClassName={s.wrapper}
        headerTitle={t.createNewPost.editPhotoModal.modalTitle}
        modalSize={'M'}
        onOpenChange={onCloseModalHandler}
        open={onOpen}
      >
        Hello
      </Modal>
      <ActionConfirmationModal
        buttonsWrapperCN={s.modalButtons}
        headerTitle={t.createNewPost.editPhotoModal.modalExitTitle}
        isOpenModal={openExitModal}
        modalTextChildren={t.createNewPost.editPhotoModal.modalExitText}
        negativeButtonChildren={t.createNewPost.editPhotoModal.modalExitSaveDraftBtn}
        onClickNegativeButton={onDraftBtnClickHandler}
        onClickPositiveButton={onModalDiscardDtnClickHandler}
        positiveButtonChildren={t.createNewPost.editPhotoModal.modalExitDiscardBtn}
        setIsOpenModal={setOpenExitModal}
      />
    </>
  )
}
