import { MessagesByIdItem } from '@/services'
import { MessageSendRequest } from '@/services/websocket/socket.types'
import { create } from 'zustand'

type SendMessage = (body: MessageSendRequest) => void

type UseWsMessagesStore = {
  messages: MessagesByIdItem[]
  sendMessage: SendMessage | null
  setMessages: (messages: MessagesByIdItem[]) => void
  setSendMessage: (foo: SendMessage) => void
}

export const useWsMessagesStore = create<UseWsMessagesStore>(set => ({
  messages: [],
  sendMessage: null,
  setMessages: (messages: MessagesByIdItem[]) =>
    set(state => {
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )

      return { messages: sortedMessages }
    }),
  setSendMessage: (foo: SendMessage) => set({ sendMessage: foo }),
}))
