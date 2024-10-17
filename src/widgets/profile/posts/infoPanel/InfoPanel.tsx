import { memo } from 'react'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './InfoPanel.module.scss'

import { StatsInfoItem } from './ui/StatsInfoItem'

interface iProps {
  about: string
  avatar: string
  userFollowers: number
  userFollowing: number
  userName: string
  userPublications: number
}

export const InfoPanel = memo(
  ({ about, avatar, userFollowers, userFollowing, userName, userPublications }: iProps) => {
    const t = useRouterLocaleDefinition()
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
              {t.profile.info.btn}
            </Button>
          </div>
          <div className={s.infoMiddle}>
            <StatsInfoItem num={userFollowing} title={t.profile.info.stats.following} />
            <StatsInfoItem num={userFollowers} title={t.profile.info.stats.followers} />
            <StatsInfoItem num={userPublications} title={t.profile.info.stats.publications} />
          </div>
          <Typography variant={'regular-text-16'}>{about}</Typography>
        </div>
      </div>
    )
  }
)
