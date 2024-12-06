import { useEffect } from 'react'

import { useGetNotificationsQuery } from '@/services/flow/notofocations.service'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { useWsNotificationsStore } from '@/services/websocket/store/use-ws-notofocations-store'
import { io } from 'socket.io-client'

import { Message, MessageSendRequest, Notification, WS_EVENT_PATH } from './socket.types'

const url = 'https://inctagram.work'

export function useSocket(isAuthenticated: boolean) {
  const socket = io(url, { query: { accessToken: localStorage.getItem('accessToken') } })

  const messages = useWsMessagesStore(state => state.messages)
  const setMessages = useWsMessagesStore(state => state.setMessages)
  const setSendMessage = useWsMessagesStore(state => state.setSendMessage)

  const notifications = useWsNotificationsStore(state => state.notifications)
  const setNotifications = useWsNotificationsStore(state => state.setNotifications)

  const { data: getNotificationData } = useGetNotificationsQuery()

  useEffect(() => {
    setNotifications(getNotificationData?.items || [])
  }, [getNotificationData])

  function onConnect() {
    console.warn('🟢🟢🟢 CONNECTED')
  }

  function onDisconnect() {
    console.warn('🔴🔴🔴 DIS-CONNECTED')
  }

  function onReceiveMessage(newMessage: Message) {
    setMessages([...messages, newMessage])
  }

  function onReceiveNotification(notification: Notification) {
    console.warn('🟣🟣🟣 NOTIFICATIONS')
    setNotifications([...notifications, notification])
  }

  /*
   * что нужно передать в header?
   * is read, id, message, when
   * */

  function sendMessage(body: MessageSendRequest) {
    socket.emit(WS_EVENT_PATH.MESSAGE_SENT, body)
  }

  socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)
  socket.on(WS_EVENT_PATH.NOTIFICATIONS, onReceiveNotification)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    setSendMessage(sendMessage)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)
      socket.off(WS_EVENT_PATH.NOTIFICATIONS, onReceiveNotification)
    }
  }, [])
}
