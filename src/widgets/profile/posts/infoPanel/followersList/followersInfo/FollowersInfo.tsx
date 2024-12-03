import { Dispatch, SetStateAction, useState } from 'react'

import { useGetUserFollowersQuery } from '@/services/flow/followers.service'
import {
  RequestLineLoader,
  useRelocateToProfile,
  useRouterLocaleDefinition,
  useSearchBy,
} from '@/shared'
import { TextField } from '@technosamurai/techno-ui-kit'

import s from './FollowersInfo.module.scss'

import { FollowerItem } from './followerItem/FollowerItem'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowersInfo = ({ setOpenModal, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')
  const { data: getFollowersData, isLoading: isLoadingGetFollowers } = useGetUserFollowersQuery({
    search: searchTerm,
    userName,
  })

  const { changeSearchHandler } = useSearchBy(setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler } = useRelocateToProfile(setOpenModal)

  return (
    <>
      {(isLoadingRelocate || isLoadingGetFollowers) && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearchHandler}
          placeholder={t.profile.info.stats.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />

        {getFollowersData?.items.map(item => {
          return (
            <FollowerItem item={item} key={item.id} navigateToProfile={navigateToProfileHandler} />
          )
        })}
      </div>
    </>
  )
}
