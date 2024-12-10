import { useState } from 'react'

import s from './DialogWindow.module.scss'

import { ChatField } from './chatField/ChatField'
import { HeaderUser } from './headerUser/HeaderUser'
import { INITIAL_TEXT_FIELD_HEIGHT } from './lib/variables'
import { TextAreaField } from './textAreaField/TextAreaField'

interface IProps {
  avatar: string
  userId?: string | string[]
  userName: string
}

export const DialogWindow = ({ avatar, userId, userName }: IProps) => {
  const [textAreaHeight, setTextAreaHeight] = useState(INITIAL_TEXT_FIELD_HEIGHT)

  const changeTextAreaHeightHandler = (height: number) => {
    setTextAreaHeight(height)
  }

  return (
    <div className={s.wrapper}>
      <HeaderUser avatar={avatar} userId={userId} userName={userName} />
      <ChatField avatar={avatar} textAreaHeight={textAreaHeight} userId={userId} />
      <TextAreaField onHeightChange={changeTextAreaHeightHandler} />
    </div>
  )
}
