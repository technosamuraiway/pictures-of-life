import { useEffect } from 'react'

import { useWsMessagesStore } from '@/services/websocket/hooks/use-ws-messages-store'
import { io } from 'socket.io-client'

import { Message, MessageSendRequest, WS_EVENT_PATH } from './socket.types'

const url = 'https://inctagram.work'

export function useSocket() {
  const socket = io(url, { query: { accessToken: localStorage.getItem('accessToken') } })

  const messages = useWsMessagesStore(state => state.messages)
  const setMessages = useWsMessagesStore(state => state.setMessages)

  function onConnect() {
    console.log('🟢🟢🟢 CONNECTED')
  }

  function onDisconnect() {
    console.log('🔴🔴🔴 DIS-CONNECTED')
  }

  function sendMessage(body: MessageSendRequest) {
    socket.emit(WS_EVENT_PATH.MESSAGE_SENT, body)
  }

  function onReceiveMessage(newMessage: Message) {
    setMessages([...messages, newMessage])
  }

  useEffect(() => {
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off(WS_EVENT_PATH.RECEIVE_MESSAGE, onReceiveMessage)
    }
  }, [])

  return { sendMessage, socket }
}
