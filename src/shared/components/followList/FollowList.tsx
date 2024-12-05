import { Dispatch, SetStateAction } from 'react'

import { UserFollowItems } from '@/services'
import { useRelocateToProfile, useSearchBy } from '@/shared'

import { FollowInformation } from './followInformation/FollowInformation'

interface IProps {
  data?: UserFollowItems[]
  isFollowers: boolean
  searchTerm: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export const FollowList = ({
  data,
  isFollowers,
  searchTerm,
  setOpenModal,
  setSearchTerm,
}: IProps) => {
  const { changeSearchHandler } = useSearchBy(setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler } = useRelocateToProfile(setOpenModal)

  return (
    <FollowInformation
      changeSearch={changeSearchHandler}
      data={data}
      isFollowers={isFollowers}
      isLoading={isLoadingRelocate}
      navigateToProfile={navigateToProfileHandler}
      searchTerm={searchTerm}
    />
  )
}
