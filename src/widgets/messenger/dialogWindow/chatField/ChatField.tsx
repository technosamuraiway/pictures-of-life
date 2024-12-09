import s from './ChatField.module.scss'

import { FriendMessage } from './friendMessage/FriendMessage'
import { MyMessage } from './myMessage/MyMessage'

interface IProps {
  avatar: string
  userId?: string | string[]
}

export const ChatField = ({ avatar, userId }: IProps) => {
  return (
    <div className={s.content}>
      <FriendMessage
        avatar={avatar}
        createdAt={'2024-12-06T10:47:49.478Z'}
        message={
          'Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine'
        }
      />
      <MyMessage
        createdAt={'2024-12-06T11:47:49.478Z'}
        isRead
        message={
          'Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine Test message friend of mine'
        }
      />
      <h2>Chat with user {userId}</h2>
    </div>
  )
}
