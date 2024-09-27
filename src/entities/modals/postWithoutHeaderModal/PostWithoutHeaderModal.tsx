import { ComponentPropsWithoutRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal } from '@/entities'
import { PATH, useRouterLocaleDefinition } from '@/shared'
import { LeftIcon } from '@public/LeftIcon'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './PostWithoutHeaderModal.module.scss'

interface IProps extends ComponentPropsWithoutRef<typeof Modal> {
  contentCN?: string
  onBackButtonClick?: () => void
  onOpen: boolean
  setOnOpen: (onOpen: boolean) => void
}

export const PostWithoutHeaderModal = ({
  children,
  contentCN,
  headerTitle,
  modalSize = 'M',
  onBackButtonClick,
  onOpen,
  setOnOpen,
  ...rest
}: IProps) => {
  const t = useRouterLocaleDefinition()
  const { replace } = useRouter()
  const [openExitModal, setOpenExitModal] = useState<boolean>(false)

  const onCloseModalHandler = () => {
    setOpenExitModal(true)
  }

  const onModalDiscardDtnClickHandler = () => {
    setOnOpen(false)
    replace(PATH.HOME)
  }

  const onDraftBtnClickHandler = () => {
    setOnOpen(false)
    toast.info('Здесь будет функционал черновиков, когда-нибудь точно появится!')
    replace(PATH.HOME)
  }

  return (
    <>
      <Modal
        contentClassName={clsx(s.wrapper, contentCN)}
        modalSize={modalSize}
        onOpenChange={onCloseModalHandler}
        open={onOpen}
        showHeader={false}
        {...rest}
      >
        <div className={s.headerWrapper}>
          <Button onClick={onBackButtonClick} variant={'iconButton'}>
            <LeftIcon className={s.leftIcon} />
          </Button>
          <Typography>{headerTitle}</Typography>
        </div>
        {children}
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
