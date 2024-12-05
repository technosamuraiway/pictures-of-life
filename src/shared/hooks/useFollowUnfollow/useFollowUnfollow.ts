import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { useCreateFollowingMutation, useUnfollowByUserIdMutation } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'

export const useFollowUnfollow = (
  userId: number,
  userName: string,
  setOpenModal: Dispatch<SetStateAction<boolean>>
) => {
  const t = useRouterLocaleDefinition()

  const [unfollow, { isLoading: isLoadingUnfollow }] = useUnfollowByUserIdMutation()
  const [createFollowing, { isLoading: isLoadingCreateFollowing }] = useCreateFollowingMutation()

  const unfollowUserHandler = async () => {
    await unfollow({ userId: Number(userId) })
    setOpenModal(false)

    toast.info(`${t.profile.info.stats.followers.successDelete} ${userName}`)
  }

  const followUserHandler = async () => {
    await createFollowing({ selectedUserId: Number(userId) })

    toast.success(`${t.profile.info.stats.followers.successFollowing} ${userName}`)
  }

  const isLoadingFollowUnfollow = isLoadingUnfollow || isLoadingCreateFollowing

  return { followUserHandler, isLoadingFollowUnfollow, unfollowUserHandler }
}
