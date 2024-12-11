import { MetaHead, useRouterLocaleDefinition } from '@/shared'
import { getLayoutWithNav } from '@/widgets'

import Messenger from './[userId]'

const MessengerPage = () => {
  const t = useRouterLocaleDefinition()

  return (
    <>
      <MetaHead title={t.messenger.title} />
      <Messenger />
    </>
  )
}

MessengerPage.getLayout = getLayoutWithNav
export default MessengerPage
