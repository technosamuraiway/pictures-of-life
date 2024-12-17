import { formatDateToToday, useRouterLocaleDefinition } from '@/shared'
import { Scrollbar, Typography } from '@technosamurai/techno-ui-kit'

import s from './ChatField.module.scss'

import { FriendMessage } from './friendMessage/FriendMessage'
import { useChatField } from './lib/useChatField'
import { MyMessage } from './myMessage/MyMessage'

interface IProps {
  avatar?: string
  textAreaHeight: number
}

export const ChatField = ({ avatar, textAreaHeight }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { meRequestData, messageGroups, scrollHeight } = useChatField(textAreaHeight)

  return (
    <div className={s.content}>
      <Scrollbar maxHeight={scrollHeight}>
        {messageGroups.map((group, index) => (
          <div key={index}>
            <Typography as={'h4'} className={s.dateSeparator} variant={'regular-text-14'}>
              {formatDateToToday(group.date, t.messenger.today)}
            </Typography>
            {group.messages.map(message => {
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
          </div>
        ))}
      </Scrollbar>
    </div>
  )
}
