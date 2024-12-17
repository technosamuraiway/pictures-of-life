import { MessagesByIdItem } from '@/services'
import { MessageGroup } from '@/services/websocket/socket.types'
import { convertDate } from '@/shared'

import { parseDateString } from './parseDateToString'

export function groupMessagesByDate(messages: MessagesByIdItem[]): MessageGroup[] {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const groups = new Map<string, MessagesByIdItem[]>()

  sortedMessages.forEach(message => {
    const date = convertDate(message.createdAt)

    if (!groups.has(date)) {
      groups.set(date, [])
    }
    groups.get(date)!.push(message)
  })

  return Array.from(groups.entries())
    .map(([date, messages]) => ({
      date,
      messages,
    }))
    .sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime())
}
