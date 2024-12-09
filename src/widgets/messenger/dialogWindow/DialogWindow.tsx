import s from './DialogWindow.module.scss'

import { ChatField } from './chatField/ChatField'
import { HeaderUser } from './headerUser/HeaderUser'
import { TextAreaField } from './textAreaField/TextAreaField'

interface IProps {
  avatar: string
  userId?: string | string[]
  userName: string
}

export const DialogWindow = ({ avatar, userId, userName }: IProps) => {
  return (
    <div className={s.wrapper}>
      <HeaderUser avatar={avatar} userId={userId} userName={userName} />
      <ChatField avatar={avatar} userId={userId} />
      <TextAreaField />
    </div>
  )
}
