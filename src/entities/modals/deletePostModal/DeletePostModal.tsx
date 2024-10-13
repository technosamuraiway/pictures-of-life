import { ReactNode } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './DeletePostModal.module.scss'

interface IProps {
  buttonsWrapperCN?: string
  headerTitle: string
  isDisableButtons?: boolean
  isOpenModal: boolean
  modalTextChildren: ReactNode
  negativeButtonChildren?: ReactNode
  onClickNegativeButton?: () => void
  onClickPositiveButton: () => void
  positiveButtonChildren: ReactNode
  setIsOpenModal: (isOpenModal: boolean) => void
}

export function DeletePostModal({
  headerTitle,
  isOpenModal,
  onClickNegativeButton,
  onClickPositiveButton,
  setIsOpenModal,
}: IProps) {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Modal
        closeButtonClassName={s.closeButton}
        headerTitle={'Delete Post'}
        onOpenChange={setIsOpenModal}
        open={isOpenModal}
      >
        <div className={s.childrenWrapper}>
          <Typography variant={'regular-text-16'}>{headerTitle}</Typography>
          <div className={s.buttonsWrapper}>
            <Button
              className={s.modalButton}
              onClick={onClickPositiveButton}
              type={'button'}
              variant={'outline'}
            >
              {t.logOut.buttonYes}
            </Button>
            <Button className={s.modalButton} onClick={onClickNegativeButton} type={'button'}>
              {t.logOut.buttonNo}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
