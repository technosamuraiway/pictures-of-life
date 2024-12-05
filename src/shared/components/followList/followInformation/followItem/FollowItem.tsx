import { useState } from 'react'

import { ActionConfirmationModal } from '@/entities'
import { UserFollowItems } from '@/services'
import {
  AvatarWithUserName,
  RequestLineLoader,
  useFollowUnfollow,
  useRouterLocaleDefinition,
} from '@/shared'

import s from './FollowItem.module.scss'

import { FollowersButtons } from './followersButtons/FollowersButtons'
import { FollowingButtons } from './followingButtons/FollowingButtons'

interface IProps {
  isFollowers: boolean
  item: UserFollowItems
  navigateToProfile: (id: string) => void
}

export const FollowItem = ({ isFollowers, item, navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false)

  const { followUserHandler, isLoadingFollowUnfollow, unfollowUserHandler } = useFollowUnfollow(
    item.userId,
    item.userName,
    setOpenUnfollowModal
  )

  const navigateToProfileHandler = () => {
    navigateToProfile(String(item.userId))
  }

  return (
    <>
      {isLoadingFollowUnfollow && <RequestLineLoader />}
      <div className={s.infoWrapper}>
        <AvatarWithUserName
          avatar={item?.avatars[1]?.url}
          navigateToProfile={navigateToProfileHandler}
          textVariant={'regular-text-16'}
          userName={item.userName}
        />
        {isFollowers ? (
          <FollowersButtons
            followUser={followUserHandler}
            isFollowing={item.isFollowing}
            isLoading={isLoadingFollowUnfollow}
            setOpenModal={setOpenUnfollowModal}
          />
        ) : (
          <FollowingButtons
            followUser={followUserHandler}
            isFollowing={item.isFollowing}
            isLoading={isLoadingFollowUnfollow}
            setOpenModal={setOpenUnfollowModal}
          />
        )}
      </div>
      <ActionConfirmationModal
        headerTitle={t.profile.info.stats.following.unFollow}
        isDisableButtons={isLoadingFollowUnfollow}
        isOpenModal={openUnfollowModal}
        modalTextChildren={`${t.profile.info.stats.following.modalText}${item.userName}`}
        negativeButtonChildren={t.profile.info.stats.following.no}
        onClickPositiveButton={unfollowUserHandler}
        positiveButtonChildren={t.profile.info.stats.following.yes}
        setIsOpenModal={setOpenUnfollowModal}
      />
    </>
  )
}
