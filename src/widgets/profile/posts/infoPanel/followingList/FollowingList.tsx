import { Dispatch, SetStateAction, useState } from 'react'

import { FollowersFollowingModal } from '@/entities'
import { useGetUserFollowingQuery } from '@/services'
import { AddNewFriends, FollowList, useRouterLocaleDefinition } from '@/shared'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowingList = ({ openModal, setOpenModal, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: getFollowingData } = useGetUserFollowingQuery({
    search: searchTerm,
    userName,
  })

  return (
    <FollowersFollowingModal
      headerTitle={`${getFollowingData?.items.length} ${t.profile.info.stats.following.title}`}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      {getFollowingData?.items.length ? (
        <FollowList
          data={getFollowingData?.items}
          isFollowers={false}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <AddNewFriends title={t.profile.info.stats.following.emptyList} />
      )}
    </FollowersFollowingModal>
  )
}
