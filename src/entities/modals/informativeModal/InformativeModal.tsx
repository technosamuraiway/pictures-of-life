import { ReactNode } from 'react'

import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './InformativeModal.module.scss'

interface IProps {
  buttonsWrapperCN?: string
  headerTitle: string
  isDisableButtons?: boolean
  isOpenModal: boolean | null
  modalTextChildren: ReactNode
  onClickPositiveButton: () => void
  positiveButtonChildren: ReactNode
  setIsOpenModal: (isOpenModal: boolean) => void
}

export const InformativeModal = ({
  buttonsWrapperCN,
  headerTitle,
  isDisableButtons,
  isOpenModal,
  modalTextChildren,
  onClickPositiveButton,
  positiveButtonChildren,
  setIsOpenModal,
}: IProps) => {
  return (
    <Modal
      closeButtonClassName={s.closeButton}
      contentClassName={s.contentWrapper}
      headerTitle={headerTitle}
      onOpenChange={setIsOpenModal}
      open={isOpenModal === null ? false : isOpenModal}
    >
      <div className={s.childrenWrapper}>
        <Typography variant={'regular-text-16'}>{modalTextChildren}</Typography>
        <div className={clsx(s.buttonsWrapper, buttonsWrapperCN)}>
          <Button
            className={s.modalButton}
            disabled={isDisableButtons}
            fullWidth
            onClick={onClickPositiveButton}
            type={'button'}
          >
            {positiveButtonChildren}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
