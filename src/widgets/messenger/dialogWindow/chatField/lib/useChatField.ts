import { useEffect, useRef, useState } from 'react'

import { useGetUserMessagesByUserIDQuery } from '@/services'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { useUserIdFromParams } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

const SCROLL_HEIGHT = 515

export const useChatField = (textAreaHeight: number) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const scrollbarRef = useRef<HTMLDivElement | null>(null)
  const { userId } = useUserIdFromParams()
  const { meData: meRequestData } = useMeWithRouter()
  const { setMessages } = useWsMessagesStore()

  const { data: getUserMessagesData, isLoading: getUserMessagesDataIsLoading } =
    useGetUserMessagesByUserIDQuery({
      dialoguePartnerId: Number(userId),
    })

  useEffect(() => {
    if (getUserMessagesData) {
      setMessages(getUserMessagesData.items)
    }

    if (!getUserMessagesDataIsLoading && getUserMessagesData && isInitialLoad) {
      if (scrollbarRef.current) {
        const viewport = scrollbarRef.current.querySelector('[data-radix-scroll-area-viewport]')

        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight
        }
      }
      setIsInitialLoad(false)
    }
  }, [getUserMessagesData, getUserMessagesDataIsLoading, isInitialLoad])

  const scrollHeight = SCROLL_HEIGHT - textAreaHeight

  return { meRequestData, scrollHeight, scrollbarRef }
}
