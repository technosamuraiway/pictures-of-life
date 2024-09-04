import { Trans } from '@/shared/components'
import { useRouterLocaleDefinition } from '@/shared/hooks'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './EmailSentModal.module.scss'

interface IProps {
  email: string | string[]
  isOpen: boolean
  onClickCloseModalHandler: () => void
}

export const EmailSentModal = (props: IProps) => {
  const { email, isOpen, onClickCloseModalHandler } = props

  const t = useRouterLocaleDefinition()

  return (
    <Modal onOpenChange={onClickCloseModalHandler} open={isOpen} title={t.signUpPage.modalTitle}>
      <div className={s.wrapper}>
        <Typography variant={'regular-text-16'}>
          <Trans
            tags={{
              1: () => <Typography className={s.email}>{email}</Typography>,
            }}
            text={t.signUpPage.modalText}
          />
        </Typography>
        <Button className={s.button} onClick={onClickCloseModalHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}