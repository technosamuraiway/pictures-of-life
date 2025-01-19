export type NotificationItem = {
  createdAt: Date
  id: number
  isRead: boolean
  message: string
  notifyAt: Date
}

export type GetNotificationsResponse = {
  items: NotificationItem[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetNotificationsArgs = {
  pageSize: number
}

export type MarkAsReadArgs = {
  ids: number[]
}
