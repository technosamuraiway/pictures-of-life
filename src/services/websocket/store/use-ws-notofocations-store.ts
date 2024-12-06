import { Notification } from '@/services/websocket/socket.types'
import { create } from 'zustand'

type UseWsNotificationsStore = {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

export const useWsNotificationsStore = create<UseWsNotificationsStore>(set => ({
  notifications: [],
  setNotifications: (notifications: Notification[]) => set({ notifications }),
}))
