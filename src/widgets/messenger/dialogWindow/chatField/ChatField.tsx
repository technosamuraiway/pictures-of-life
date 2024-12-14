import { Scrollbar } from '@technosamurai/techno-ui-kit'

import s from './ChatField.module.scss'

import { FriendMessage } from './friendMessage/FriendMessage'
import { useChatField } from './lib/useChatField'
import { MyMessage } from './myMessage/MyMessage'

interface IProps {
  avatar?: string
  textAreaHeight: number
}

export const ChatField = ({ avatar, textAreaHeight }: IProps) => {
  const { getUserMessagesData, meRequestData, scrollHeight, scrollbarRef } =
    useChatField(textAreaHeight)

  return (
    <div className={s.content}>
      <Scrollbar maxHeight={scrollHeight} ref={scrollbarRef}>
        {getUserMessagesData?.items.map(message => {
          if (meRequestData?.userId === message.ownerId) {
            return (
              <MyMessage
                createdAt={message.createdAt}
                isRead
                key={message.id}
                message={message.messageText}
              />
            )
          } else {
            return (
              <FriendMessage
                avatar={avatar}
                createdAt={message.createdAt}
                key={message.id}
                message={message.messageText}
              />
            )
          }
        })}
      </Scrollbar>
    </div>
  )
}
