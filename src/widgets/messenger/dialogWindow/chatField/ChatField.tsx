import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import { Scrollbar } from '@technosamurai/techno-ui-kit'

import s from './ChatField.module.scss'

import { FriendMessage } from './friendMessage/FriendMessage'
import { MyMessage } from './myMessage/MyMessage'

const messageArray = [
  {
    createdAt: '2024-12-06T10:47:49.478Z',
    id: 1267,
    message:
      'Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine',
    ownerId: 1234,
    receiverId: 1480,
  },
  {
    createdAt: '2024-12-06T10:50:49.478Z',
    id: 14798,
    message: 'Tewt dsfsf dsfds fds ',
    ownerId: 1480,
    receiverId: 1234,
  },
  {
    createdAt: '2024-12-06T10:49:49.478Z',
    id: 1209,
    message: 'Tewt dsfsf dsfds fds  ',
    ownerId: 1234,
    receiverId: 1480,
  },

  {
    createdAt: '2024-12-06T10:50:49.478Z',
    id: 1479098,
    message: 'Tewt dsfsf dsfds fds ',
    ownerId: 1480,
    receiverId: 1234,
  },

  {
    createdAt: '2024-12-07T10:49:49.478Z',
    id: 1267225,
    message: 'Goodbye',
    ownerId: 1234,
    receiverId: 1480,
  },
  {
    createdAt: '2024-12-07T10:49:49.478Z',
    id: 12625,
    message: 'Hello',
    ownerId: 1480,
    receiverId: 1234,
  },
]

interface IProps {
  avatar: string
  userId?: string | string[]
}

export const ChatField = ({ avatar, userId }: IProps) => {
  const { meData: meRequestData } = useMeWithRouter()

  return (
    <div className={s.content}>
      <Scrollbar maxHeight={480}>
        {messageArray?.map(message => {
          if (meRequestData?.userId === message.ownerId) {
            return (
              <MyMessage
                createdAt={message.createdAt}
                isRead
                key={message.id}
                message={message.message}
              />
            )
          } else {
            return (
              <FriendMessage
                avatar={avatar}
                createdAt={message.createdAt}
                key={message.id}
                message={message.message}
              />
            )
          }
        })}
      </Scrollbar>
    </div>
  )
}
