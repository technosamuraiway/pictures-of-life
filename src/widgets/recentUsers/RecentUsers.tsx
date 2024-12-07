import React from 'react'

import { UserSearch } from '@/services/types/users.types'
import { getLayoutWithNav } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './RecentUsers.module.scss'

interface IProps {
  recentUsers: UserSearch[]
}
const RecentUsers = ({ recentUsers }: IProps) => {
  return (
    <>
      {recentUsers?.map(user => (
        <div className={s.iconWrapper} key={user.id}>
          {user?.avatars?.[0]?.url ? (
            <Image
              alt={'Avatar'}
              className={s.avatar}
              height={48}
              src={user?.avatars?.[0]?.url}
              width={48}
            />
          ) : (
            <div className={s.avatarPlaceholder}>{user.userName.charAt(0).toUpperCase()}</div>
          )}
          <div className={s.userNameWrapper}>
            <Link href={`/profile/${user.id}`}>
              <Typography className={s.text} variant={'bold-text-14'}>
                {user?.userName}
              </Typography>
            </Link>
            <Typography className={s.greyText} variant={'regular-text-14'}>
              {user?.firstName}&nbsp;{user?.lastName}
            </Typography>
          </div>
        </div>
      ))}
    </>
  )
}

RecentUsers.getLayout = getLayoutWithNav
export default RecentUsers
