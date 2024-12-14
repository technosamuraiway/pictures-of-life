import { Message, MessageSendRequest } from '@/services/websocket/socket.types'
import { create } from 'zustand'

type SendMessage = (body: MessageSendRequest) => void

type UseWsMessagesStore = {
  messages: Message[]
  sendMessage: SendMessage | null
  setMessages: (messages: Message[]) => void
  setSendMessage: (foo: SendMessage) => void
}

export const useWsMessagesStore = create<UseWsMessagesStore>(set => ({
  messages: [],
  sendMessage: null,
  setMessages: (messages: Message[]) => set({ messages }),
  setSendMessage: (foo: SendMessage) => set({ sendMessage: foo }),
}))
