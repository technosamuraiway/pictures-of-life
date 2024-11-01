import { PATH } from '@/shared'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './PostModalCloseWithConfirmation.module.scss'

interface IProps {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const PostModalCloseWithConfirmation = ({ onOpenChange, open }: IProps) => {
  const { push, query } = useRouter()

  function close() {
    onOpenChange(false)
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}` })
  }

  return (
    <Modal
      contentClassName={s.root}
      headerTitle={'LOL'}
      modalSize={'L'}
      onOpenChange={onOpenChange}
      open={open}
      showHeader
    >
      <Typography variant={'bold-text-16'}>
        Are you really want to log out of your account “Epam@epam.com”?
      </Typography>

      <Button onClick={close} variant={'outline'}>
        Yes
      </Button>
      <Button onClick={() => onOpenChange(false)}>No</Button>
    </Modal>
  )
}
