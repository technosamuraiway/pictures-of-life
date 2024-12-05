import { CircleAvatar } from '@/shared'
import { Typography, TypographyVariants } from '@technosamurai/techno-ui-kit'

import s from './AvatarWithUserName.module.scss'

interface IProps {
  avatar: string
  height?: number
  navigateToProfile: () => void
  textVariant: TypographyVariants
  userName: string
  width?: number
}

export const AvatarWithUserName = ({
  avatar,
  height,
  navigateToProfile,
  textVariant,
  userName,
  width,
}: IProps) => {
  return (
    <div className={s.avaWrapper} onClick={navigateToProfile}>
      <CircleAvatar height={height} rootCN={s.hover} src={avatar} width={width} />
      <Typography className={s.hover} variant={textVariant}>
        {userName}
      </Typography>
    </div>
  )
}
