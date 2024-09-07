import { Trans, useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './EmailSentModal.module.scss'

interface IProps {
  email: string | string[]
  isOpen: boolean
  onClickCloseModal: () => void
}

export const EmailSentModal = ({ email, isOpen, onClickCloseModal }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <Modal onOpenChange={onClickCloseModal} open={isOpen} title={t.signUpPage.modalTitle}>
      <div className={s.wrapper}>
        <Typography variant={'regular-text-16'}>
          <Trans
            tags={{
              1: () => <Typography className={s.email}>{email}</Typography>,
            }}
            text={t.signUpPage.modalText}
          />
        </Typography>
        <Button className={s.button} onClick={onClickCloseModal}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
