import { memo, useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { useGetUserFollowersQuery, useGetUserFollowingQuery } from '@/services'
import {
  CircleAvatar,
  PATH,
  useFollowUnfollow,
  useGetUserIdFromParams,
  useRouterLocaleDefinition,
} from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './InfoPanel.module.scss'

import { FollowersList } from './followersList/FollowersList'
import { FollowingList } from './followingList/FollowingList'
import { FriendButtons } from './friendButtons/FriendButtons'
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
    const { userId } = useGetUserIdFromParams()

    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openFollowingModal, setOpenFollowingModal] = useState(false)
    const [openUnfollowModal, setOpenUnfollowModal] = useState(false)

    const { data: getFollowersData } = useGetUserFollowersQuery({ userName })
    const { data: getFollowingData } = useGetUserFollowingQuery({ userName })

    const { followUserHandler, isLoadingFollowUnfollow, unfollowUserHandler } = useFollowUnfollow(
      Number(userId),
      userName,
      setOpenUnfollowModal
    )

    const settingsButton = (
      <Button as={Link} href={PATH.PROFILE.SETTINGS} variant={'secondary'}>
        {t.profile.info.btn}
      </Button>
    )

    const friendButtons = (
      <FriendButtons
        followUser={followUserHandler}
        isLoading={isLoadingFollowUnfollow}
        setOpenModal={setOpenUnfollowModal}
        userName={userName}
      />
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
              {isWithSettingsBtn ? settingsButton : friendButtons}
            </div>
            <div className={s.infoMiddle}>
              <StatsInfoItem
                num={getFollowingData?.items.length || userFollowing}
                onClick={() => setOpenFollowingModal(true)}
                title={t.profile.info.stats.following.title}
              />
              <StatsInfoItem
                num={getFollowersData?.items.length || userFollowers}
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
          userName={userName}
        />
        <FollowingList
          openModal={openFollowingModal}
          setOpenModal={setOpenFollowingModal}
          userName={userName}
        />
        <ActionConfirmationModal
          headerTitle={t.profile.info.stats.following.unFollow}
          isDisableButtons={isLoadingFollowUnfollow}
          isOpenModal={openUnfollowModal}
          modalTextChildren={`${t.profile.info.stats.following.modalText}${userName}`}
          negativeButtonChildren={t.profile.info.stats.following.no}
          onClickPositiveButton={unfollowUserHandler}
          positiveButtonChildren={t.profile.info.stats.following.yes}
          setIsOpenModal={setOpenUnfollowModal}
        />
      </>
    )
  }
)
