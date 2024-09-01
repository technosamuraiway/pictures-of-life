import { Trans } from '@/shared/components/trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'

import s from './EmailSentModal.module.scss'

interface IProps {
  email: string
  isOpen: boolean
  setOpenModal: (isOpen: boolean) => void
}

export const EmailSentModal = (props: IProps) => {
  const { email, isOpen, setOpenModal } = props

  const t = useRouterLocaleDefinition()

  const onClickCloseModalHandler = () => {
    setOpenModal(false)
  }

  return (
    <Modal onOpenChange={onClickCloseModalHandler} open={isOpen} title={t.emailSent.title}>
      <div className={s.wrapper}>
        <Typography variant={'regular-text-16'}>
          <Trans
            tags={{
              1: () => <Typography className={s.email}>{email}</Typography>,
            }}
            text={t.emailSent.text}
          />
        </Typography>
        <Button className={s.button} onClick={onClickCloseModalHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
