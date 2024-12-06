import { Message } from '@/services/websocket/socket.types'
import { create } from 'zustand'

type UseWsMessagesStore = {
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

export const useWsMessagesStore = create<UseWsMessagesStore>(set => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
}))
