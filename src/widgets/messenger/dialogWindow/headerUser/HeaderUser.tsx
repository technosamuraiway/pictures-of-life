import { PATH } from '@/shared'
import mockImage from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './HeaderUser.module.scss'

interface IProps {
  avatar: string
  userId?: string | string[]
  userName: string
}

export const HeaderUser = ({ avatar, userId, userName }: IProps) => {
  return (
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
  )
}
