import { User } from '@/services/graphql/codegen/graphql'
import { useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './DeleteUserModal.module.scss'

interface IProps {
  headerTitle: string
  isOpenModal: boolean
  onClickNegativeButton?: () => void
  onClickPositiveButton: () => void
  setIsOpenModal: (isOpenModal: boolean) => void
  textContent: string
  user: User
}

export function DeleteUserModal({
  headerTitle,
  isOpenModal,
  onClickNegativeButton,
  onClickPositiveButton,
  setIsOpenModal,
  textContent,
  user,
}: IProps) {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <Modal
        closeButtonClassName={s.closeButton}
        headerTitle={headerTitle}
        onOpenChange={setIsOpenModal}
        open={isOpenModal}
      >
        <div className={s.childrenWrapper}>
          <Typography variant={'regular-text-16'}>
            {textContent}&nbsp;
            {user.userName}&nbsp;?
          </Typography>
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
