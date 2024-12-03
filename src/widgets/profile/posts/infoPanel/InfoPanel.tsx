import { memo, useState } from 'react'

import { CircleAvatar, PATH, useRouterLocaleDefinition } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './InfoPanel.module.scss'

import { FollowersList } from './followersList/FollowersList'
import { FollowingList } from './followingList/FollowingList'
import { StatsInfoItem } from './statsInfoItem/StatsInfoItem'

interface IProps {
  about: string
  avatar: string
  isWithSettingsBtn: boolean
  userFollowers: number
  userFollowing: number
  userName: string
  userPublications: number
}

export const InfoPanel = memo(
  ({
    about,
    avatar,
    isWithSettingsBtn,
    userFollowers,
    userFollowing,
    userName,
    userPublications,
  }: IProps) => {
    const t = useRouterLocaleDefinition()

    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openFollowingModal, setOpenFollowingModal] = useState(false)

    const settingsButton = isWithSettingsBtn && (
      <Button as={Link} href={PATH.PROFILE.SETTINGS} variant={'secondary'}>
        {t.profile.info.btn}
      </Button>
    )

    return (
      <>
        <div className={s.profileInfo}>
          <CircleAvatar height={204} rootCN={s.avatar} src={avatar} width={204} />
          <div className={s.info}>
            <div className={s.infoTop}>
              <Typography as={'h1'} variant={'h1'}>
                {userName}
              </Typography>
              {settingsButton}
            </div>
            <div className={s.infoMiddle}>
              <StatsInfoItem
                num={userFollowing}
                onClick={() => setOpenFollowingModal(true)}
                title={t.profile.info.stats.following.title}
              />
              <StatsInfoItem
                num={userFollowers}
                onClick={() => setOpenFollowersModal(true)}
                title={t.profile.info.stats.followers.title}
              />
              <StatsInfoItem num={userPublications} title={t.profile.info.stats.publications} />
            </div>
            <Typography variant={'regular-text-16'}>{about}</Typography>
          </div>
        </div>
        <FollowersList
          openModal={openFollowersModal}
          setOpenModal={setOpenFollowersModal}
          userFollowers={userFollowers}
        />
        <FollowingList
          openModal={openFollowingModal}
          setOpenModal={setOpenFollowingModal}
          userFollowing={userFollowing}
        />
      </>
    )
  }
)
