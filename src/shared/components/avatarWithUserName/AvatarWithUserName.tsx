import { CircleAvatar } from '@/shared'
import { Typography, TypographyVariants } from '@technosamurai/techno-ui-kit'
import { clsx } from 'clsx'

import s from './AvatarWithUserName.module.scss'

interface IProps {
  avatar: string
  className?: string
  height?: number
  navigateToProfile: () => void
  textVariant: TypographyVariants
  userName: string
  width?: number
}

export const AvatarWithUserName = ({
  avatar,
  className,
  height,
  navigateToProfile,
  textVariant,
  userName,
  width,
}: IProps) => {
  return (
    <div className={clsx(s.avaWrapper, className)} onClick={navigateToProfile}>
      <CircleAvatar height={height} rootCN={s.hover} src={avatar} width={width} />
      <Typography className={s.hover} variant={textVariant}>
        {userName}
      </Typography>
    </div>
  )
}
