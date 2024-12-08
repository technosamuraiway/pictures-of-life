import { useRouterLocaleDefinition } from '@/shared'
import { DialogWindow, getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './[userId].module.scss'

import MessengerLayout from './messengerLayout/MessengerLayout'

const Messenger = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()
  const { userId } = query

  return (
    <>
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          {t.messenger.title}
        </Typography>
      </div>
      <MessengerLayout>
        {userId ? (
          <DialogWindow userId={userId} />
        ) : (
          <Typography className={s.noContent} variant={'medium-text-14'}>
            {t.messenger.noDialogList}
          </Typography>
        )}
      </MessengerLayout>
    </>
  )
}

Messenger.getLayout = getLayoutWithNav
export default Messenger
