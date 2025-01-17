import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { MessagesByIdItem } from '@/services'
import { useGetNotificationsQuery } from '@/services/flow/notofocations.service'
import { useWsMessagesStore } from '@/services/websocket/store/use-ws-messages-store'
import { useWsNotificationsStore } from '@/services/websocket/store/use-ws-notofocations-store'
import {
  MESSAGE_STATUS,
  MESSAGE_TYPE,
  useDialogListStore,
  useRouterLocaleDefinition,
  useUserIdFromParams,
} from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { Socket, io } from 'socket.io-client'

import { MessageSendRequest, Notification, WS_EVENT_PATH } from './socket.types'

const url = 'https://inctagram.work'

export function useSocket(isAuthenticated: boolean) {
  const t = useRouterLocaleDefinition()
  const { userId } = useUserIdFromParams()

  const socketRef = useRef<Socket | null>(null)
  const { meData: meRequestData } = useMeWithRouter()
  const { switchDialogListRefetchingTrue } = useDialogListStore()
  const setMessages = useWsMessagesStore(state => state.setMessages)
  const setSendMessage = useWsMessagesStore(state => state.setSendMessage)

  const { updateMessage } = useDialogListStore()

  const notifications = useWsNotificationsStore(state => state.notifications)
  const setNotifications = useWsNotificationsStore(state => state.setNotifications)

  const [initialNotificationsSize, setInitialNotificationsSize] = useState(100)
  const { data: getNotificationData } = useGetNotificationsQuery({
    pageSize: initialNotificationsSize,
  })

  console.log(getNotificationData)
  useEffect(() => {
    if (isAuthenticated && !socketRef.current) {
      socketRef.current = io(url, { query: { accessToken: localStorage.getItem('accessToken') } })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    // нужно получить все notifications, но мы не знаем сколько их при первом запросе
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

    if (socketRef.current) {
      // Отправляем подтверждение получения сообщения
      socketRef.current.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
        message: newMessage,
        receiverId: meRequestData?.userId,
      })
    }
  }

  function onMessageSent(newMessage: MessagesByIdItem) {
    console.warn('🟤🟤🟤 RECEIVER GET MESSAGE')

    toast.info(t.messenger.newMessage)

    switchDialogListRefetchingTrue()

    const updatedMessage = {
      ...newMessage,
      status: MESSAGE_STATUS.RECEIVED,
    }

    updateMessage(newMessage.ownerId, newMessage.messageText, MESSAGE_STATUS.RECEIVED)

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
    if (socketRef.current) {
      socketRef.current.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, body)
    }

    // if (meRequestData) {
    //   const newMessage: MessagesByIdItem = {
    //     createdAt: new Date().toISOString(),
    //     id: Number(Date.now().toString()),
    //     messageText: body.message,
    //     messageType: MESSAGE_TYPE.TEXT,
    //     ownerId: meRequestData.userId,
    //     receiverId: body.receiverId,
    //     status: MESSAGE_STATUS.SENT,
    //     updatedAt: new Date().toISOString(),
    //   }
    //
    //   setMessages(prevMessages => [...prevMessages, newMessage])
    // }
  }

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current

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
  }, [])
}
