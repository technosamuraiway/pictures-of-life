import { PATH } from '@/shared'
import mockImage from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './DialogWindow.module.scss'

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
        <h2>Chat with user {userId}</h2>
      </div>
    </div>
  )
}
