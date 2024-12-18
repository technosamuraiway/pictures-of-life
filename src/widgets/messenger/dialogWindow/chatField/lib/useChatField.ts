import { useEffect } from 'react'

import { useGetUserMessagesByUserIDQuery, useMarkAsReadMessageMutation } from '@/services'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { MESSAGE_STATUS, useUserIdFromParams } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

const SCROLL_HEIGHT = 515

export const useChatField = (textAreaHeight: number) => {
  const { userId } = useUserIdFromParams()
  const { meData: meRequestData } = useMeWithRouter()
  const { messageGroups, setMessages } = useWsMessagesStore()
  const [markAsReadMessage] = useMarkAsReadMessageMutation()

  const { data: getUserMessagesData } = useGetUserMessagesByUserIDQuery({
    dialoguePartnerId: Number(userId),
  })

  useEffect(() => {
    if (getUserMessagesData) {
      setMessages(() => getUserMessagesData.items)

      const unreadPartnerMessages = getUserMessagesData.items
        .filter(msg => msg.ownerId === Number(userId) && msg.status !== MESSAGE_STATUS.READ)
        .map(msg => msg.id)

      if (unreadPartnerMessages.length > 0) {
        markAsReadMessage({ ids: unreadPartnerMessages })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserMessagesData, userId, markAsReadMessage])

  const scrollHeight = SCROLL_HEIGHT - textAreaHeight

  return { meRequestData, messageGroups, scrollHeight }
}
