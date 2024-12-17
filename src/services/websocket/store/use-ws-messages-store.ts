import { MessagesByIdItem } from '@/services'
import { MessageSendRequest } from '@/services/websocket/socket.types'
import { convertDate } from '@/shared'
import { create } from 'zustand'

type MessageGroup = {
  date: string
  messages: MessagesByIdItem[]
}

type SendMessage = (body: MessageSendRequest) => void

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

export function groupMessagesByDate(messages: MessagesByIdItem[]): MessageGroup[] {
  const groups: { [key: string]: MessagesByIdItem[] } = {}

  messages.forEach(message => {
    const date = convertDate(message.createdAt)

    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })

  return Object.entries(groups)
    .map(([date, messages]) => ({ date, messages }))
    .sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime())
}

function parseDateString(dateString: string): Date {
  const [day, month, year] = dateString.split('.').map(Number)

  return new Date(year, month - 1, day)
}
