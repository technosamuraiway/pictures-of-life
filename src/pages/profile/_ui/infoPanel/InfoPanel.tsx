import { memo } from 'react'

import { StatsInfoItem } from '@/pages/profile/_ui/components/StatsInfoItem'
import { PATH, useProfileLocale } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './InfoPanel.module.scss'

interface iProps {
  about: string
  avatar: string
  userName: string
}

export const InfoPanel = memo(({ about, avatar, userName }: iProps) => {
  const t = useProfileLocale()
  const { push } = useRouter()

  return (
    <div className={s.profileInfo}>
      <Image
        alt={'profile-round-avatar'}
        className={s.avatar}
        height={204}
        src={avatar}
        width={204}
      />
      <div className={s.info}>
        <div className={s.infoTop}>
          <Typography as={'h1'} variant={'h1'}>
            {userName}
          </Typography>
          <Button as={'a'} onClick={() => push(PATH.PROFILE.SETTINGS)} variant={'secondary'}>
            {t.info.btn}
          </Button>
        </div>
        <div className={s.infoMiddle}>
          <StatsInfoItem num={2218} title={t.info.stats.following} />
          <StatsInfoItem num={2358} title={t.info.stats.followers} />
          <StatsInfoItem num={2764} title={t.info.stats.publications} />
        </div>
        <Typography variant={'regular-text-16'}>{about}</Typography>
      </div>
    </div>
  )
})
