import { PATH } from '@/shared'
import mockImage from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './DialogWindow.module.scss'

import { FriendMessage } from './friendMessage/FriendMessage'
import { MyMessage } from './myMessage/MyMessage'
import { TextAreaField } from './textAreaField/TextAreaField'

interface IProps {
  avatar: string
  userId?: string | string[]
  userName: string
}

export const DialogWindow = ({ avatar, userId, userName }: IProps) => {
  return (
    <div className={s.wrapper}>
      <Link className={s.header} href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}>
        <Image
          alt={'User avatar'}
          className={s.avatar}
          height={48}
          src={avatar || mockImage}
          width={48}
        />
        <Typography variant={'regular-text-16'}>{userName}</Typography>
      </Link>
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
      <TextAreaField />
    </div>
  )
}
