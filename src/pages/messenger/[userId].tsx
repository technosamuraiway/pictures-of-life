import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { DialogWindow, getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './[userId].module.scss'

import MessengerLayout from './messengerLayout/MessengerLayout'

const userName = 'Hello'
const avatarSrc = ''
const Messenger = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()
  const { userId } = query

  return (
    <>
      <MetaHead title={t.messenger.title} />
      <div className={s.header}>
        <Typography as={'h1'} variant={'h1'}>
          {t.messenger.title}
        </Typography>
      </div>
      <MessengerLayout>
        {userId ? (
          <DialogWindow avatar={avatarSrc} userId={userId} userName={userName} />
        ) : (
          <div className={s.wrapper}>
            <Typography className={s.noContent} variant={'medium-text-14'}>
              {t.messenger.noDialogList}
            </Typography>
          </div>
        )}
      </MessengerLayout>
    </>
  )
}

Messenger.getLayout = getLayoutWithNav
export default Messenger
