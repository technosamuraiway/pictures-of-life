import { RoundAvatar } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'

import s from './AvatarInfo.module.scss'

export const AvatarInfo = () => {
  return (
    <div className={s.wrapper}>
      <RoundAvatar
        avatarCN={s.avatar}
        avatarWrapperCN={s.avatar}
        imgCN={s.avatar}
        isShowAddBtn={false}
        isShowDeleteBtn={false}
      />
      <div className={s.textWrapper}>
        <Typography as={'h2'} variant={'h1'}>
          Test
        </Typography>
        <Typography as={'h3'} className={s.email} variant={'regular-text-14'}>
          Test test
        </Typography>
      </div>
    </div>
  )
}
