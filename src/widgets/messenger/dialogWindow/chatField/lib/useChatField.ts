import { useEffect } from 'react'

import { useGetUserMessagesByUserIDQuery } from '@/services'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { useUserIdFromParams } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

const SCROLL_HEIGHT = 515

export const useChatField = (textAreaHeight: number) => {
  const { userId } = useUserIdFromParams()
  const { meData: meRequestData } = useMeWithRouter()
  const { messageGroups, setMessages } = useWsMessagesStore()

  const { data: getUserMessagesData } = useGetUserMessagesByUserIDQuery({
    dialoguePartnerId: Number(userId),
  })

  useEffect(() => {
    if (getUserMessagesData) {
      setMessages(() => getUserMessagesData.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserMessagesData])

  const scrollHeight = SCROLL_HEIGHT - textAreaHeight

  return { meRequestData, messageGroups, scrollHeight }
}
