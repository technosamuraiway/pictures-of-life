import { Dispatch, SetStateAction, useState } from 'react'

import { useGetUserFollowersQuery } from '@/services/flow/followers.service'
import { FollowInformation, useRelocateToProfile, useSearchBy } from '@/shared'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowersInfo = ({ setOpenModal, userName }: IProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: getFollowersData, isLoading: isLoadingGetFollowers } = useGetUserFollowersQuery({
    search: searchTerm,
    userName,
  })

  const { changeSearchHandler } = useSearchBy(setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler } = useRelocateToProfile(setOpenModal)

  return (
    <FollowInformation
      changeSearch={changeSearchHandler}
      data={getFollowersData?.items}
      isFollowers
      isLoading={isLoadingRelocate}
      navigateToProfile={navigateToProfileHandler}
      searchTerm={searchTerm}
    />
  )
}
