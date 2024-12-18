import { MessagesByIdItem } from '@/services'
import { MessageGroup, SendMessage } from '@/services/websocket/socket.types'
import { create } from 'zustand'

import { groupMessagesByDate } from '../lib/groupMessagesByDate'

type UseWsMessagesStore = {
  messageGroups: MessageGroup[]
  sendMessage: SendMessage | null
  setMessages: (updater: (prevMessages: MessagesByIdItem[]) => MessagesByIdItem[]) => void
  setSendMessage: (foo: SendMessage) => void
}

export const useWsMessagesStore = create<UseWsMessagesStore>(set => ({
  messageGroups: [],
  sendMessage: null,
  setMessages: updater =>
    set(state => {
      const updatedMessages = updater(state.messageGroups.flatMap(group => group.messages))
      const groups = groupMessagesByDate(updatedMessages)

      return { messageGroups: groups }
    }),
  setSendMessage: (foo: SendMessage) => set({ sendMessage: foo }),
}))
