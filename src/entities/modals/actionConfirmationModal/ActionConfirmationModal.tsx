import { ReactNode } from 'react'

import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './ActionConfirmationModal.module.scss'

interface IProps {
  headerTitle: string
  isOpenModal: boolean
  modalTextChildren: ReactNode
  negativeButtonChildren: ReactNode
  onClickPositiveButton: () => void
  positiveButtonChildren: ReactNode
  setIsOpenModal: (isOpenModal: boolean) => void
}

export const ActionConfirmationModal = ({
  headerTitle,
  isOpenModal,
  modalTextChildren,
  negativeButtonChildren,
  onClickPositiveButton,
  positiveButtonChildren,
  setIsOpenModal,
}: IProps) => {
  const onClickNegativeButtonHandler = () => {
    setIsOpenModal(false)
  }

  return (
    <Modal
      contentClassName={s.contentWrapper}
      headerTitle={headerTitle}
      onOpenChange={setIsOpenModal}
      open={isOpenModal}
    >
      <div className={s.childrenWrapper}>
        <Typography variant={'regular-text-16'}>{modalTextChildren}</Typography>
        <div className={s.buttonsWrapper}>
          <Button className={s.modalButton} onClick={onClickPositiveButton} variant={'outline'}>
            {positiveButtonChildren}
          </Button>
          <Button className={s.modalButton} onClick={onClickNegativeButtonHandler}>
            {negativeButtonChildren}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
