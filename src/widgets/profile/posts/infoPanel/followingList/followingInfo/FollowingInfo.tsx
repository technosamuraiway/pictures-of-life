import { Dispatch, SetStateAction, useState } from 'react'

import { useGetUserFollowingQuery } from '@/services'
import {
  RequestLineLoader,
  useRelocateToProfile,
  useRouterLocaleDefinition,
  useSearchBy,
} from '@/shared'
import { Scrollbar, TextField } from '@technosamurai/techno-ui-kit'

import s from './FollowingInfo.module.scss'

import { FollowingItem } from './followingItem/FollowingItem'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  userName: string
}

export const FollowingInfo = ({ setOpenModal, userName }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: getFollowingData, isLoading: isLoadingGetFollowing } = useGetUserFollowingQuery({
    search: searchTerm,
    userName,
  })

  const { changeSearchHandler } = useSearchBy(setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler } = useRelocateToProfile(setOpenModal)

  return (
    <>
      {(isLoadingRelocate || isLoadingGetFollowing) && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearchHandler}
          placeholder={t.profile.info.stats.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />
        <Scrollbar maxHeight={400}>
          <div className={s.itemsWrapper}>
            {getFollowingData?.items?.map(item => {
              return (
                <FollowingItem
                  item={item}
                  key={item.id}
                  navigateToProfile={navigateToProfileHandler}
                />
              )
            })}
          </div>
        </Scrollbar>
      </div>
    </>
  )
}
