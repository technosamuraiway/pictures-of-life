import { MessagesByIdItem } from '@/services'
import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/shared'

export enum WS_EVENT_PATH {
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SENT = 'message-sent',
  NOTIFICATIONS = 'notifications',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

export type MessageSendRequest = {
  message: string
  receiverId: number
}

export type MessageUpdateRequest = {
  id: number
  message: string
}

export type MessageGroup = {
  date: string
  messages: MessagesByIdItem[]
}

export type SendMessage = (body: MessageSendRequest) => void

export type Message = {
  createdAt: string
  id: number
  messageText: string
  messageType: MESSAGE_TYPE
  ownerId: number
  receiverId: number
  status: MESSAGE_STATUS
  updatedAt: string
}

export type Notification = {
  clientId: string
  createdAt: Date
  eventType: number
  id: number
  isRead: boolean
  message: string
  notifyAt: Date
}

export type SocketError = {
  error: string
  message: string
}
