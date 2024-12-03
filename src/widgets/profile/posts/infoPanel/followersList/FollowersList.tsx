import { Dispatch, SetStateAction } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { AddNewFriends, useRouterLocaleDefinition } from '@/shared'

import { FollowersInfo } from './followersInfo/FollowersInfo'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userFollowers: number
  userName: string
}

export const FollowersList = ({ openModal, setOpenModal, userFollowers, userName }: IProps) => {
  const t = useRouterLocaleDefinition()

  return (
    <FollowersFollowingModal
      headerTitle={`${userFollowers} ${t.profile.info.stats.followers.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {userFollowers ? (
        <FollowersInfo setOpenModal={setOpenModal} userName={userName} />
      ) : (
        <AddNewFriends title={t.profile.info.stats.followers.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
