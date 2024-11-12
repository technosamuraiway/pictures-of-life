import { memo } from 'react'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './confirmModal.module.scss'
interface IProps {
  cbOnConfirm?: () => Promise<void>
  confirmMessage: string
  headerTitle: string
  onOpenChange: (open: boolean) => void
  open: boolean
  overlayClassName?: string
}

export const ConfirmationModal = memo(
  ({ cbOnConfirm, confirmMessage, headerTitle, onOpenChange, open, overlayClassName }: IProps) => {
    const t = useRouterLocaleDefinition()
    const { push, query } = useRouter()

    async function close() {
      if (cbOnConfirm) {
        await cbOnConfirm()
      }
      onOpenChange(false)
      push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}` })
    }

    return (
      <Modal
        headerTitle={headerTitle}
        modalSize={'M'}
        onOpenChange={onOpenChange}
        open={open}
        overlayClassName={overlayClassName}
        showHeader
      >
        <div className={s.message}>
          <Typography variant={'bold-text-16'}>{confirmMessage}</Typography>
        </div>

        <div className={s.buttonsWrapper}>
          <Button onClick={close} variant={'outline'}>
            {t.profile.modal.confirmation.buttonYes}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {t.profile.modal.confirmation.buttonNo}
          </Button>
        </div>
      </Modal>
    )
  }
)
