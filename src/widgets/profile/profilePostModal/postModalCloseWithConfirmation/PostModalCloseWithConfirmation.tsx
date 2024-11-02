import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PostModalCloseWithConfirmation.module.scss'

interface IProps {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const PostModalCloseWithConfirmation = ({ onOpenChange, open }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push, query } = useRouter()

  function close() {
    onOpenChange(false)
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}` })
  }

  return (
    <Modal
      headerTitle={t.profile.modal.confirmation.modalHeaderTitle}
      modalSize={'M'}
      onOpenChange={onOpenChange}
      open={open}
      showHeader
    >
      <div className={s.message}>
        <Typography variant={'bold-text-16'}>{t.profile.modal.confirmation.message}</Typography>
      </div>

      <div className={s.buttonsWrapper}>
        <Button onClick={close} variant={'outline'}>
          {t.profile.modal.confirmation.buttonYes}
        </Button>
        <Button onClick={() => onOpenChange(false)}>{t.profile.modal.confirmation.buttonNo}</Button>
      </div>
    </Modal>
  )
}
