import { ReactNode } from 'react'

import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './ActionConfirmationModal.module.scss'

interface IProps {
  buttonsWrapperCN?: string
  headerTitle: string
  isDisableButtons?: boolean
  isOpenModal: boolean
  modalTextChildren: ReactNode
  negativeButtonChildren: ReactNode
  onClickNegativeButton?: () => void
  onClickPositiveButton: () => void
  positiveButtonChildren: ReactNode
  setIsOpenModal: (isOpenModal: boolean) => void
}

export const ActionConfirmationModal = ({
  buttonsWrapperCN,
  headerTitle,
  isDisableButtons,
  isOpenModal,
  modalTextChildren,
  negativeButtonChildren,
  onClickNegativeButton,
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
        <div className={clsx(s.buttonsWrapper, buttonsWrapperCN)}>
          <Button
            className={s.modalButton}
            disabled={isDisableButtons}
            onClick={onClickPositiveButton}
            variant={'outline'}
          >
            {positiveButtonChildren}
          </Button>
          <Button
            className={s.modalButton}
            disabled={isDisableButtons}
            onClick={onClickNegativeButton ?? onClickNegativeButtonHandler}
          >
            {negativeButtonChildren}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
