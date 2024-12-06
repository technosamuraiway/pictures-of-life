import { CircleAvatar, PATH } from '@/shared'
import { Typography, TypographyVariants } from '@technosamurai/techno-ui-kit'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './AvatarWithUserName.module.scss'

interface IProps {
  avatar: string
  className?: string
  height?: number
  textVariant: TypographyVariants
  userId?: number
  userName: string
  width?: number
}

export const AvatarWithUserName = ({
  avatar,
  className,
  height,
  textVariant,
  userId,
  userName,
  width,
}: IProps) => {
  return (
    <div className={clsx(s.avaWrapper, className)}>
      <CircleAvatar
        height={height}
        href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}
        rootCN={s.hover}
        src={avatar}
        width={width}
      />
      <Typography
        as={Link}
        className={s.hover}
        href={`${PATH.PROFILE.BASEPROFILE}/${userId}`}
        variant={textVariant}
      >
        {userName}
      </Typography>
    </div>
  )
}
