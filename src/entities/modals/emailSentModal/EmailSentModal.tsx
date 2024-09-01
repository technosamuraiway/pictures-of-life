import { Trans } from '@/shared/components/trans/Trans'
import { useRouterLocaleDefinition } from '@/shared/hooks/useRouterLocaleDefinition'
import { PATH } from '@/shared/utils/pathVariables'
import { Button, Modal, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './EmailSentModal.module.scss'

interface IProps {
  email: string
  isOpen: boolean
}

export const EmailSentModal = ({ email, isOpen }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { replace } = useRouter()

  const navigateToSignInClickHandler = () => {
    replace(PATH.SIGNIN)
  }

  return (
    <Modal onOpenChange={navigateToSignInClickHandler} open={isOpen} title={t.emailSent.title}>
      <div className={s.wrapper}>
        <Typography variant={'regular-text-16'}>
          <Trans
            tags={{
              1: () => <Typography className={s.email}>{email}</Typography>,
            }}
            text={t.emailSent.text}
          />
        </Typography>
        <Button className={s.button} onClick={navigateToSignInClickHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
