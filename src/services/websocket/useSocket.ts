import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { MessagesByIdItem } from '@/services'
import { useGetNotificationsQuery } from '@/services/flow/notofocations.service'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { useWsNotificationsStore } from '@/services/websocket/store/use-ws-notofocations-store'
import {
  MESSAGE_STATUS,
  useDialogListStore,
  useRouterLocaleDefinition,
  useUserIdFromParams,
} from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { io } from 'socket.io-client'

import { MessageSendRequest, Notification, WS_EVENT_PATH } from './socket.types'

const url = 'https://inctagram.work'

export function useSocket(isAuthenticated: boolean) {
  const t = useRouterLocaleDefinition()
  const { userId } = useUserIdFromParams()
  const socket = io(url, { query: { accessToken: localStorage.getItem('accessToken') } })
  const { meData: meRequestData } = useMeWithRouter()
  const { switchDialogListRefetchingTrue } = useDialogListStore()
  const setMessages = useWsMessagesStore(state => state.setMessages)
  const setSendMessage = useWsMessagesStore(state => state.setSendMessage)

  const notifications = useWsNotificationsStore(state => state.notifications)
  const setNotifications = useWsNotificationsStore(state => state.setNotifications)

  const [initialNotificationsSize, setInitialNotificationsSize] = useState(100)
  const { data: getNotificationData } = useGetNotificationsQuery({
    pageSize: initialNotificationsSize,
  })

  useEffect(() => {
    // нужно получить все notifications, но мы не знаем сколько их при первом запрсое
    if (!!getNotificationData && initialNotificationsSize < getNotificationData.totalCount) {
      setInitialNotificationsSize(getNotificationData.totalCount)

      return
    }

    setNotifications(getNotificationData?.items || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNotificationData, initialNotificationsSize])

  function onConnect() {
    console.warn('🟢🟢🟢 CONNECTED')
  }

  function onDisconnect() {
    console.warn('🔴🔴🔴 DIS-CONNECTED')
  }

  function onReceiveMessage(newMessage: MessagesByIdItem) {
    console.warn('🟡🟡🟡 RECEIVE')
    setMessages(prevMessages => [...prevMessages, newMessage])

    // Отправляем подтверждение получения сообщения
    socket.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
      message: newMessage,
      receiverId: meRequestData?.userId,
    })
  }

  function onMessageSent(newMessage: MessagesByIdItem) {
    console.warn('🟤🟤🟤 RECEIVER GET MESSAGE')

    toast.info(t.messenger.newMessage)

    switchDialogListRefetchingTrue()

    const updatedMessage = {
      ...newMessage,
      status: MESSAGE_STATUS.RECEIVED,
    }

    if (updatedMessage.ownerId === Number(userId)) {
      setMessages(prevMessages => [...prevMessages, updatedMessage])
    }
  }

  function onReceiveNotification(notification: Notification) {
    console.warn('🟣🟣🟣 NOTIFICATIONS')
    setNotifications([...notifications, notification])
  }

  function sendMessage(body: MessageSendRequest) {
    console.warn('⚪⚪⚪ SEND MESSAGE')
    socket.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, body)
  }

  useEffect(() => {
    if (isAuthenticated) {
      socket.on('connect', onConnect)
      socket.on('disconnect', onDisconnect)

      socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)
      socket.on(WS_EVENT_PATH.MESSAGE_SENT, onMessageSent)
      socket.on(WS_EVENT_PATH.NOTIFICATIONS, onReceiveNotification)

      setSendMessage(sendMessage)

      return () => {
        socket.off('connect', onConnect)
        socket.off('disconnect', onDisconnect)
        socket.off(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)
        socket.off(WS_EVENT_PATH.MESSAGE_SENT, onMessageSent)
        socket.off(WS_EVENT_PATH.NOTIFICATIONS, onReceiveNotification)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, socket, setSendMessage])

  return { sendMessage }
}
