import { create } from 'zustand'

type Notification = {
  clientId?: string
  createdAt: Date
  eventType?: number
  id: number
  isRead: boolean
  message: string
  notifyAt: Date
}

type UseWsNotificationsStore = {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

export const useWsNotificationsStore = create<UseWsNotificationsStore>(set => ({
  notifications: [],
  setNotifications: (notifications: Notification[]) => set({ notifications }),
}))
