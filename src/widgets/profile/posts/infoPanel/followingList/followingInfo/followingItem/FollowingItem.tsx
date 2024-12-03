import { useState } from 'react'
import { toast } from 'react-toastify'

import { ActionConfirmationModal } from '@/entities'
import {
  UserFollowItems,
  useCreateFollowingMutation,
  useUnfollowByUserIdMutation,
} from '@/services'
import { AvatarWithUserName, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './FollowingItem.module.scss'

interface IProps {
  item: UserFollowItems
  navigateToProfile: (id: string) => void
}

export const FollowingItem = ({ item, navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false)

  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowByUserIdMutation()
  const [createFollowing, { isLoading: isLoadingCreateFollowing }] = useCreateFollowingMutation()

  const navigateToProfileHandler = () => {
    navigateToProfile(String(item.userId))
  }

  const unfollowUserHandler = async () => {
    await unfollow({ userId: Number(item.userId) })
    setOpenUnfollowModal(false)

    toast.info(`${t.profile.info.stats.followers.successDelete} ${item.userName}`)
  }

  const followUserHandler = async () => {
    await createFollowing({ selectedUserId: Number(item.userId) })

    toast.success(`${t.profile.info.stats.followers.successFollowing} ${item.userName}`)
  }

  return (
    <>
      {(isLoadingUnfollow || isLoadingCreateFollowing) && <RequestLineLoader />}
      <div className={s.infoWrapper}>
        <AvatarWithUserName
          avatar={item?.avatars[1]?.url}
          navigateToProfile={navigateToProfileHandler}
          userName={item.userName}
        />
        <div className={s.buttonsWrapper}>
          <Button
            onClick={item.isFollowing ? () => setOpenUnfollowModal(true) : followUserHandler}
            variant={item.isFollowing ? 'outline' : 'primary'}
          >
            {item.isFollowing
              ? t.profile.info.stats.following.unFollow
              : t.profile.info.stats.following.follow}
          </Button>
        </div>
      </div>
      <ActionConfirmationModal
        headerTitle={t.profile.info.stats.following.unFollow}
        isDisableButtons={isLoadingUnfollow || isLoadingCreateFollowing}
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
