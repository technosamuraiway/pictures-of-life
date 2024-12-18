import { MetaHead, useRouterLocaleDefinition, useUserIdFromParams } from '@/shared'
import { DialogWindow, getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './[userId].module.scss'

import MessengerLayout from './messengerLayout/MessengerLayout'

const Messenger = () => {
  const t = useRouterLocaleDefinition()
  const { userId } = useUserIdFromParams()

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
          <DialogWindow />
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
