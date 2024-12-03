import { Dispatch, SetStateAction } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { AddNewFriends, useRouterLocaleDefinition } from '@/shared'

import { FollowingInfo } from './followingInfo/FollowingInfo'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userFollowing: number
  userName: string
}

export const FollowingList = ({ openModal, setOpenModal, userFollowing, userName }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <FollowersFollowingModal
      headerTitle={`${userFollowing} ${t.profile.info.stats.following.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {userFollowing ? (
        <FollowingInfo setOpenModal={setOpenModal} userName={userName} />
      ) : (
        <AddNewFriends title={t.profile.info.stats.following.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
