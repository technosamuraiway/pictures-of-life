import { GET_USER } from '@/services/graphql/queries/user'
import { PATH, useGetUserIdFromParams } from '@/shared'
import { useQuery } from '@apollo/client'
import noAvatar from '@public/profileAvatar/no-avatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

import s from './AvatarInfo.module.scss'

export const AvatarInfo = () => {
  const { userId } = useGetUserIdFromParams()

  const { data: getUserData } = useQuery(GET_USER, {
    variables: {
      userId: Number(userId),
    },
  })

  const avatarSrc =
    (getUserData?.getUser?.profile?.avatars && getUserData?.getUser?.profile?.avatars[0]?.url) ||
    noAvatar

  const nameUser =
    getUserData?.getUser.profile.firstName || getUserData?.getUser.profile.lastName
      ? `${getUserData?.getUser.profile.firstName} ${getUserData?.getUser.profile.lastName}`.trim()
      : getUserData?.getUser?.userName || ''

  return (
    <div className={s.wrapper}>
      <Image
        alt={`${getUserData?.getUser?.userName} avatar`}
        className={s.avatarImg}
        height={60}
        priority
        src={avatarSrc}
        width={60}
      />
      <div className={s.textWrapper}>
        <Typography as={'h2'} variant={'h1'}>
          {nameUser}
        </Typography>
        <Typography
          as={Link}
          className={s.email}
          href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}
          variant={'regular-text-14'}
        >
          {getUserData?.getUser?.userName}
        </Typography>
      </div>
    </div>
  )
}
