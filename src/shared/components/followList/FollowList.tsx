import { Dispatch, SetStateAction } from 'react'

import { UserFollowItems } from '@/services'
import { useSearchBy } from '@/shared'

import { FollowInformation } from './followInformation/FollowInformation'

interface IProps {
  data?: UserFollowItems[]
  isFollowers: boolean
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export const FollowList = ({ data, isFollowers, searchTerm, setSearchTerm }: IProps) => {
  const { changeSearchHandler } = useSearchBy(setSearchTerm)

  return (
    <FollowInformation
      changeSearch={changeSearchHandler}
      data={data}
      isFollowers={isFollowers}
      searchTerm={searchTerm}
    />
  )
}
