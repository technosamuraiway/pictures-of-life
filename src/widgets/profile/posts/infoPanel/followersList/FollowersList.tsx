import { Dispatch, SetStateAction, useState } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { useGetUserFollowersQuery } from '@/services'
import { AddNewFriends, FollowList, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userFollowers: number
  userName: string
}

export const FollowersList = ({ openModal, setOpenModal, userFollowers, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: getFollowersData } = useGetUserFollowersQuery({
    search: searchTerm,
    userName,
  })

  return (
    <FollowersFollowingModal
      headerTitle={`${userFollowers} ${t.profile.info.stats.followers.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {userFollowers ? (
        <FollowList
          data={getFollowersData?.items}
          isFollowers
          searchTerm={searchTerm}
          setOpenModal={setOpenModal}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <AddNewFriends title={t.profile.info.stats.followers.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
