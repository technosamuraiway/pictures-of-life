import { Dispatch, SetStateAction, useState } from 'react'

import { useGetUserFollowingQuery } from '@/services'
import { FollowInformation, useRelocateToProfile, useSearchBy } from '@/shared'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowingInfo = ({ setOpenModal, userName }: IProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: getFollowingData, isLoading: isLoadingGetFollowing } = useGetUserFollowingQuery({
    search: searchTerm,
    userName,
  })

  const { changeSearchHandler } = useSearchBy(setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler } = useRelocateToProfile(setOpenModal)

  return (
    <FollowInformation
      changeSearch={changeSearchHandler}
      data={getFollowingData?.items}
      isFollowers={false}
      isLoading={isLoadingRelocate}
      navigateToProfile={navigateToProfileHandler}
      searchTerm={searchTerm}
    />
  )
}
