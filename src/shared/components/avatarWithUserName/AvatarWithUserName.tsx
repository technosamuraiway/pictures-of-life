import { CircleAvatar } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './AvatarWithUserName.module.scss'

interface IProps {
  avatar: string
  navigateToProfile: () => void
  userName: string
}

export const AvatarWithUserName = ({ avatar, navigateToProfile, userName }: IProps) => {
  return (
    <div className={s.avaWrapper} onClick={navigateToProfile}>
      <CircleAvatar rootCN={s.hover} src={avatar} />
      <Typography className={s.hover} variant={'regular-text-16'}>
        {userName}
      </Typography>
    </div>
  )
}
