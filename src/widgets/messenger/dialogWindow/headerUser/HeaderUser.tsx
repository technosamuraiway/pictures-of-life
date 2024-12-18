import { PATH, useUserIdFromParams } from '@/shared'
import mockImage from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './HeaderUser.module.scss'

interface IProps {
  avatar?: string
  userName?: string
}

export const HeaderUser = ({ avatar, userName }: IProps) => {
  const { userId } = useUserIdFromParams()

  return (
    <div className={s.wrapper}>
      <Link className={s.linkAva} href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}>
        <Image
          alt={'User avatar'}
          className={s.avatar}
          height={48}
          src={avatar || mockImage}
          width={48}
        />
      </Link>
      <Link href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}>
        <Typography variant={'regular-text-16'}>{userName}</Typography>
      </Link>
    </div>
  )
}
