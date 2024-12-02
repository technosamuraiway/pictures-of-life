import { CircleAvatar } from '@/shared'
import testImg from '@public/mockAvatar.png'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './AvatarWithUserName.module.scss'

interface IProps {
  navigateToProfile: () => void
}

export const AvatarWithUserName = ({ navigateToProfile }: IProps) => {
  return (
    <div className={s.avaWrapper} onClick={navigateToProfile}>
      <CircleAvatar rootCN={s.hover} src={testImg.src} />
      <Typography className={s.hover} variant={'regular-text-16'}>
        {'UserName'}
      </Typography>
    </div>
  )
}
