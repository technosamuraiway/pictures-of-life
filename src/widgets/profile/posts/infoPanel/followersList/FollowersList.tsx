import { Dispatch, SetStateAction, useState } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { useGetUserFollowersQuery } from '@/services'
import { AddNewFriends, FollowList, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowersList = ({ openModal, setOpenModal, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: getFollowersData } = useGetUserFollowersQuery({
    search: searchTerm,
    userName,
  })

  return (
    <FollowersFollowingModal
      headerTitle={`${getFollowersData?.items.length} ${t.profile.info.stats.followers.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {getFollowersData?.items.length ? (
        <FollowList
          data={getFollowersData?.items}
          isFollowers
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <AddNewFriends title={t.profile.info.stats.followers.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
