import { ComponentPropsWithoutRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal } from '@/entities'
import { PATH, saveImagesToDB, useRouterLocaleDefinition } from '@/shared'
import { LeftIcon } from '@public/LeftIcon'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './PostWithoutHeaderModal.module.scss'

interface IProps extends ComponentPropsWithoutRef<typeof Modal> {
  addTextView: boolean
  contentCN?: string
  downloadedImage: string[]
  editFilter: boolean
  isDisabled?: boolean
  nextBtnTitle?: string
  onBackButtonClick?: () => void
  onNextButtonClick?: () => void
  onOpen: boolean
  setOnOpen: (onOpen: boolean) => void
}

export const PostWithoutHeaderModal = ({
  addTextView,
  children,
  contentCN,
  downloadedImage,
  editFilter,
  headerTitle,
  isDisabled,
  modalSize = 'M',
  nextBtnTitle,
  onBackButtonClick,
  onNextButtonClick,
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

  const onModalDiscardDtnClickHandler = async () => {
    await replace(PATH.HOME)
    setOnOpen(false)
  }

  const onDraftBtnClickHandler = async () => {
    const indexedImages = downloadedImage.map(img => {
      return { dataUrl: img, id: uuid(), lastUpdated: Date.now() }
    })

    async function saveMultipleImages() {
      try {
        await saveImagesToDB(indexedImages) // Сохраняем массив изображений в IndexedDB
        toast.success('Изображения успешно сохранены в базе данных!')
      } catch (error) {
        toast.error('Ошибка при сохранении изображений:')
      }
    }

    await saveMultipleImages()

    await replace(PATH.HOME)
    setOnOpen(false)
  }

  return (
    <>
      <Modal
        contentClassName={clsx(s.wrapper, contentCN)}
        headerTitle={headerTitle}
        modalSize={editFilter || addTextView ? 'XL' : modalSize}
        onOpenChange={onCloseModalHandler}
        open={onOpen}
        showHeader={false}
        {...rest}
      >
        <div className={s.headerWrapper}>
          <Button
            disabled={isDisabled}
            onClick={onBackButtonClick}
            type={'button'}
            variant={'iconButton'}
          >
            <LeftIcon className={s.leftIcon} />
          </Button>
          <Typography>{headerTitle}</Typography>
          <Button
            className={s.nextButton}
            disabled={isDisabled}
            onClick={onNextButtonClick}
            type={'button'}
            variant={'outline'}
          >
            {nextBtnTitle}
          </Button>
        </div>
        {children}
      </Modal>
      <ActionConfirmationModal
        buttonsWrapperCN={s.modalButtons}
        headerTitle={t.createNewPost.editPhotoModal.closeEditor.modalExitTitle}
        isOpenModal={openExitModal}
        modalTextChildren={t.createNewPost.editPhotoModal.closeEditor.modalExitText}
        negativeButtonChildren={t.createNewPost.editPhotoModal.closeEditor.modalExitSaveDraftBtn}
        onClickNegativeButton={onDraftBtnClickHandler}
        onClickPositiveButton={onModalDiscardDtnClickHandler}
        positiveButtonChildren={t.createNewPost.editPhotoModal.closeEditor.modalExitDiscardBtn}
        setIsOpenModal={setOpenExitModal}
      />
    </>
  )
}
