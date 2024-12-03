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

import s from './FollowerItem.module.scss'

interface IProps {
  item: UserFollowItems
  navigateToProfile: (id: string) => void
}

export const FollowerItem = ({ item, navigateToProfile }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowByUserIdMutation()
  const [createFollowing, { isLoading: isLoadingCreateFollowing }] = useCreateFollowingMutation()

  const navigateToProfileHandler = () => {
    navigateToProfile(String(item.userId))
  }

  const followUserHandler = async () => {
    await createFollowing({ selectedUserId: Number(item.userId) })

    toast.success(`${t.profile.info.stats.followers.successFollowing} ${item.userName}`)
  }

  const deleteFollowUserHandler = async () => {
    await unfollow({ userId: Number(item.userId) })
    setOpenDeleteModal(false)

    toast.info(`${t.profile.info.stats.followers.successDelete} ${item.userName}`)
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
          {item.isFollowing ? (
            <Button
              disabled={isLoadingUnfollow || isLoadingCreateFollowing}
              onClick={() => setOpenDeleteModal(true)}
              variant={'secondary'}
            >
              {t.profile.info.stats.followers.delete}
            </Button>
          ) : (
            <Button
              disabled={isLoadingUnfollow || isLoadingCreateFollowing}
              onClick={followUserHandler}
              variant={'primary'}
            >
              {t.profile.info.stats.followers.follow}
            </Button>
          )}
        </div>
      </div>
      <ActionConfirmationModal
        headerTitle={t.profile.info.stats.followers.deleteFollowing}
        isDisableButtons={isLoadingUnfollow || isLoadingCreateFollowing}
        isOpenModal={openDeleteModal}
        modalTextChildren={`${t.profile.info.stats.followers.modalText}${item.userName}`}
        negativeButtonChildren={t.profile.info.stats.followers.no}
        onClickPositiveButton={deleteFollowUserHandler}
        positiveButtonChildren={t.profile.info.stats.followers.yes}
        setIsOpenModal={setOpenDeleteModal}
      />
    </>
  )
}
