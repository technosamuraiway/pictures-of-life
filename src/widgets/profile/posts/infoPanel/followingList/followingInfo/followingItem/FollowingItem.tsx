import React from 'react'

import { CircleAvatar, useRouterLocaleDefinition } from '@/shared'
import testImg from '@public/error404.png'
import { Button, Typography } from '@technosamurai/techno-ui-kit'

import s from './FollowingItem.module.scss'

interface IProps {
  navigateToProfile: (id: string) => void
}

export const FollowingItem = ({ navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <div className={s.infoWrapper}>
      <div className={s.avaWrapper} onClick={() => navigateToProfile('1478')}>
        <CircleAvatar rootCN={s.hover} src={testImg.src} />
        <Typography className={s.hover} variant={'regular-text-16'}>
          {'UserName'}
        </Typography>
      </div>
      <div className={s.buttonsWrapper}>
        <Button variant={'primary'}>{t.profile.info.stats.followers.follow}</Button>
        <Button variant={'secondary'}>{t.profile.info.stats.followers.delete}</Button>
      </div>
    </div>
  )
}
