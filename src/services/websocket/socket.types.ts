export enum MessageStatus {
  READ = 'READ',
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
}

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

export type Message = {
  createdAt: string
  id: number
  messageText: string
  messageType: string
  ownerId: number
  receiverId: number
  status: 'READ' | 'RECEIVED' | 'SENT'
  updatedAt: string
}

export type Notification = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type SocketError = {
  error: string
  message: string
}
