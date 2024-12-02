import { Dispatch, SetStateAction, useState } from 'react'

import {
  PATH,
  RequestLineLoader,
  useGetUserIdFromParams,
  useRelocateToProfile,
  useRouterLocaleDefinition,
  useSearchBy,
} from '@/shared'
import { TextField } from '@technosamurai/techno-ui-kit'

import s from './FollowersInfo.module.scss'

import { FollowerItem } from './followerItem/FollowerItem'

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const FollowersInfo = ({ setOpenModal }: IProps) => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')

  const refetch = () => {}

  const { changeSearchHandler } = useSearchBy(refetch, setSearchTerm)
  const { isLoadingRelocate, navigateToProfileHandler, userId } = useRelocateToProfile(setOpenModal)

  return (
    <>
      {isLoadingRelocate && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearchHandler}
          placeholder={t.profile.info.stats.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />
        <FollowerItem navigateToProfile={navigateToProfileHandler} />
      </div>
    </>
  )
}
