import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react'

import { Modal } from '@technosamurai/techno-ui-kit'

import s from './FollowersFollowingModal.module.scss'

interface IProps extends ComponentPropsWithoutRef<typeof Modal> {
  headerTitle: string
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FollowersFollowingModal = ({
  children,
  headerTitle,
  openModal,
  setOpenModal,
  ...rest
}: IProps) => {
  return (
    <Modal
      contentClassName={s.wrapper}
      headerTitle={headerTitle}
      modalSize={'L'}
      onOpenChange={setOpenModal}
      open={openModal}
      {...rest}
    >
      <div className={s.padding}>{children}</div>
    </Modal>
  )
}
