import { Dispatch, SetStateAction, useState } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { useGetUserFollowingQuery } from '@/services'
import { AddNewFriends, FollowList, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userFollowing: number
  userName: string
}

export const FollowingList = ({ openModal, setOpenModal, userFollowing, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: getFollowingData } = useGetUserFollowingQuery({
    search: searchTerm,
    userName,
  })

  return (
    <FollowersFollowingModal
      headerTitle={`${userFollowing} ${t.profile.info.stats.following.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {userFollowing ? (
        <FollowList
          data={getFollowingData?.items}
          isFollowers
          searchTerm={searchTerm}
          setOpenModal={setOpenModal}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <AddNewFriends title={t.profile.info.stats.following.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
